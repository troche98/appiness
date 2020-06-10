const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    description: {
        type: String,
    },
    unit_price: {
        type: Number,
    },
    quantity: {
        type: Number,
    }
});

module.exports = mongoose.model('Item', itemSchema);