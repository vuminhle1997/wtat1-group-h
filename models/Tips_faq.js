const mongoose = require('mongoose');

let TipsFaqSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        required: true
    }
});

mongoose.model('TipsFAQ', TipsFaqSchema);