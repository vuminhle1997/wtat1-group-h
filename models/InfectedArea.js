const mongoose = require('mongoose');

/**
 * Infected Area - Model
 * 
 */
let InfectedAreaSchema = new mongoose.Schema({
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report',
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

mongoose.model('InfectedArea', InfectedAreaSchema);