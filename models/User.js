const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        lowercase: true
    },
    hash: String,
    salt: String
}, { timestamps: true });

mongoose.model('User', UserSchema);