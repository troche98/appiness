var express = require('express');
var router = express.Router();

var paymentService = require('../services/paymentService');

// CREATE A PAYMENT
router.post('/payment', async function(req, res) {
    if (req.body.id_order && req.body.status && req.body.credit_card_number) {        
        var newPayment = {
            id_order: req.body.id_order,
            status: req.body.status,
            credit_card_number: req.body.credit_card_number,
            payment_date: new Date(),
        };
        paymentService.paymentCreate(newPayment)
        .then((doc) => {
            console.log(doc);
            return res.status(200).send("Payment created");
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(500).send("Couldn't create a payment.");
        })
    }
    else
        return res.status(400).send("Field missing in the body: id_order, status and credit_card_number are required.");
});

// GET ALL PAYMENTS
router.get('/payment', async function(req, res) {
    paymentService.paymentFindAll()
    .then((doc) => {
        console.log(doc);
        return res.status(200).send(doc);
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).send("Couldn't get payments.");
    })
})

// DELETE ALL PAYMENTS
router.delete('/payment', async function(req, res) {
    paymentService.paymentDelete()
    .then((doc) => {
        console.log(doc);
        return res.status(200).send(doc);
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).send("Couldn't delete payments.");
    })
})

module.exports = router;