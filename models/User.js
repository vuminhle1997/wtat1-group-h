const mongoose = require('mongoose');

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
    firstname: { 
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
        required: false
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
        enum: ["User", "Employee_Public_Health"],
        required: false
    },
    active: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// UserSchema.path('email').validate((value, next) => {
//     mongoose.model('User').findOne({email: value}, (err, user) => {
//         if (err) return next(err);

//     })
// })

mongoose.model('User', UserSchema);