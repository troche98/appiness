const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    id_order: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    credit_card_number: {
        type: Number,
        required: true,
    },
    payment_date: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Payment', paymentSchema);