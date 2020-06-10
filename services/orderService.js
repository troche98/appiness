var Order = require('../models/order');
var Item = require('../models/item');
var paymentService = require('./paymentService');

class OrderService {

    async orderUpdate(id_order, newValues) {
        return new Promise((resolve, reject) => {
            Order.updateOne({_id: id_order}, newValues)
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    async orderRefundAll(id_order, _items) {
        return new Promise((resolve, reject) => {
            Order.find({_id: id_order})
            .then(docs => {
                const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                const today = new Date();
                const diffDays = Math.round(Math.abs((docs[0].confirmation_date - today) / oneDay));
                if (diffDays <= 10) {
                    if (_items) {
                        if (_items.length < 1) {
                            resolve("No given item.");
                        }
                        for (var i = 0; i < docs[0].items.length; i++) {
                            var index = _items.includes(docs[0].items[i]._id.toString());
                            if (index >= 0)
                                docs[0].items.splice(i, 1);
                        }
                        this.orderUpdate(docs[0]._id, {items: docs[0].items, status: "concluded"});
                        paymentService.paymentUpdate(docs[0]._id, {status: "concluded"});
                        resolve("Items refunded.");
                    }
                    else {
                        paymentService.paymentUpdate(docs[0]._id, {status: "refunded"});
                        this.orderUpdate(docs[0]._id, {status: "refunded"});
                        resolve("Order refunded.");
                    }
                }
                else {
                    paymentService.paymentUpdate(docs[0]._id, {status: "concluded"});
                    resolve({message: "Refund expired 10 days passed."});
                }
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    async orderFindByParameters(query) {
        return new Promise((resolve, reject) => {
            Order.find({$or:[
                {address: query.address}, 
                {confirmation_date: query.confirmation_date},
                {status: query.status},
                {items: query.items}
            ]})
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    async orderCreate(_newOrder) {
        return new Promise((resolve, reject) => {
            var newOrder = new Order(_newOrder);
            newOrder.save()
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    async orderFindAll() {
        return new Promise((resolve, reject) => {
            Order.find({})
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            })
        });
    }
}

var orderService = new OrderService();

module.exports = orderService;