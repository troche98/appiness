const mongoose = require('mongoose');
var Item = require('./item');

const orderSchema = mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    confirmation_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
    },
    items: {
        type : [{String, Number, Number}]
    },
    total_price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Order', orderSchema);