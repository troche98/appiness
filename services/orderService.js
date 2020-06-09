var Order = require('../models/order');

class OrderService {

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