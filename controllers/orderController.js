var express = require('express');
var router = express.Router();

var orderService = require('../services/orderService');
var Item = require('../models/item');

// CREATE AN ORDER
router.post('/order', async function(req, res) {
    if (req.body.address && req.body.status && req.body.items) {
        var items = [];
        var total_price = 0;
        for (var i = 0; i < req.body.items.length; i++) {
            var _item = {
                description: req.body.items[i].description,
                unit_price: req.body.items[i].unit_price,
                quantity: req.body.items[i].quantity,
            };
            var newItem = new Item(_item);
            total_price += req.body.items[i].unit_price * req.body.items[i].quantity;
            items.push(newItem);
        }
        var newOrder = {
            address: req.body.address,
            confirmation_date: new Date(),
            status: req.body.status,
            items: items,
            total_price: total_price
        };
        orderService.orderCreate(newOrder)
        .then((doc) => {
            console.log(doc);
            return res.status(200).send("Order created");
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(500).send("Couldn't create an order.");
        })
    }
    else
        return res.status(400).send("Field missing in the body: address, status and items are required.");
});

// GET ALL ORDERS
router.get('/order', async function(req, res) {
    orderService.orderFindAll()
    .then((doc) => {
        console.log(doc);
        return res.status(200).send(doc);
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).send("Couldn't get orders.");
    })
})

// GET ORDER by parameter
router.get('/order/parameters', async function(req, res) {
    orderService.orderFindByParameters(req.query)
    .then((doc) => {
        console.log(doc);
        return res.status(200).send(doc);
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).send("Couldn't get orders.");
    })
})

// REFUND ORDER OR ANY ORDER ITEM
router.post('/order/refund/:id_order', async function(req, res) {
    orderService.orderRefundAll(req.params.id_order, req.body.items)
    .then((doc) => {
        return res.status(200).send(doc);
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).send("Couldn't get a refund.");
    })
})

module.exports = router;