var Payment = require('../models/payment');
var Order = require('../models/order');

class PaymentService {

    async getPriceFromOrder(id_order) {
        return new Promise((resolve, reject) => {
            Order.find({_id: id_order})
            .then(docs => {
                resolve(docs[0].total_price);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    async paymentCreate(_newPayment) {
        return new Promise((resolve, reject) => {
            var newPayment = new Payment(_newPayment);
            newPayment.save()
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    async paymentUpdate(id_order, newValues) {
        return new Promise((resolve, reject) => {
            Payment.updateOne({id_order: id_order}, newValues)
            .then(docs => {
                console.log(docs);
                resolve("Payment set to concluded.");
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    async paymentDelete() {
        return new Promise((resolve, reject) => {
            Payment.remove({})
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    async paymentFindAll() {
        return new Promise((resolve, reject) => {
            Payment.find({})
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            })
        });
    }
}

var paymentService = new PaymentService();

module.exports = paymentService;