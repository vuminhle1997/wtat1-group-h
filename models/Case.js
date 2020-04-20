const mongoose = require('mongoose');

let CaseSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

mongoose.model('Case', CaseSchema);