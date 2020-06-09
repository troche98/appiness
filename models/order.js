const mongoose = require('mongoose');

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
        type : [{
            description: {
                type: String,
                required: true,
            },
            unit_price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            }
        }]
    },
    total_price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Order', orderSchema);