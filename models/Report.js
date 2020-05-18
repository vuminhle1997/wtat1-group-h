const mongoose = require('mongoose');

let ReportSchema = new mongoose.Schema({
    submitter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    symptoms: {
        type: String,
        required: true
    },
    precondition: {
        type: String,
        required: true
    },
    infected_area: {
        type: Boolean,
        required: true
    },
    infected_person: {
        type: Boolean,
        required: true
    },
    person_from_infected: {
        type: Boolean,
        required: true
    },
    details: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: 'sent'
    }
}, {timestamps: true});

mongoose.model('Report', ReportSchema);