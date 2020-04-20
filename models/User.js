const mongoose = require('mongoose');
// const crypto = require('crypto');

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    firsname: { 
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['M','F']
    },
    dob: {
        type: Date,
        required: true
    },
    personalId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: false
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    role: {
        type: String,
        enum: ["User", "Government"],
        required: false
    }
}, { timestamps: true });

// UserSchema.methods.setPassword = function(password){
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// }

mongoose.model('User', UserSchema);