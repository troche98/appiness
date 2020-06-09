var express = require('express');
var router = express.Router();

var storeService = require('../services/storeService');

// CREATE A STORE
router.post('/store', async function(req, res) {
    if (!req.body.name || !req.body.address)
        return res.status(400).send("Field missing in the body: name and address are required.");
    var newStore = {
        name: req.body.name,
        address: req.body.address
    };
    storeService.storeCreate(newStore)
    .then((doc) => {
        console.log(doc);
        return res.status(200).send("Store created.");
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).send("Couldn't create a store.");
    })
});

// RETRIEVE STORE BY PARAMETERS
router.get('/stores', async function(req, res) {
    if (req.body.name) {
        storeService.storeFindByName(req.body.name)
        .then((doc) => {
            console.log(doc);
            return res.status(200).send(doc);
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(400).send("Store not found by name.");
        })
    }
    else if (req.body.address) {
        storeService.storeFindByAddress(req.body.address)
        .then((doc) => {
            console.log(doc);
            return res.status(200).send(doc);
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(400).send("Store not found by address.");
        })
    }
    else {
        return res.status(400).send("Field missing in the body: name or address required.");
    }
});

// RETRIEVE STORE BY ID
router.get('/store/:id', async function(req, res) {
    storeService.storeFindById(req.params.id)
    .then((doc) => {
        console.log(doc);
        return res.status(200).send(doc);
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(400).send("Store not found.");
    })
});

// RETRIEVE ALL STORES
router.get('/all/stores', async function(req, res) {
    storeService.storeFind()
    .then((doc) => {
        console.log(doc);
        return res.status(200).send(doc);
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(400).send("Store not found.");
    })
});

// UPDATE A STORE
router.put('/store/:id', async function(req, res) {
    if (req.body.name || req.body.address) {
        var newValues = {
            name: req.body.name,
            address: req.body.address
        };
    }
    else if (!req.body.name && req.body.address) {
        var newValues = {
            address: req.body.address
        };
    }
    else if (!req.body.address && req.body.name) {
        var newValues = {
            name: req.body.name
        };
    }
    else
        return res.status(400).send("Field missing in the body: name or address required.");
    storeService.storeUpdate(req.params.id, newValues)
    .then((doc) => {
        console.log(doc);
        return res.status(200).send(doc);
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(400).send("Store not found.");
    })
});

module.exports = router;