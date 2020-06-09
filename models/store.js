const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Store', storeSchema);