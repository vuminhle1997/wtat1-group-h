const mongoose = require('mongoose');
const crypto = require('crypto');

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
    salt: String,
    bio: {
        type: String,
        default: ``
    }
}, { timestamps: true });

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

mongoose.model('User', UserSchema);