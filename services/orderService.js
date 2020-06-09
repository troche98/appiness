var Order = require('../models/order');

class OrderService {

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