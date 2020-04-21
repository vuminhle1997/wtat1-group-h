let router = require('express').Router();
const mongoose = require('mongoose');
let User = mongoose.model('User');

const saltRound = 10;
const bcrypt = require('bcrypt');
const auth = require('../../auth');
const jwt = require('jsonwebtoken');
const secret = require('../../../config').secret; 

/**
 * This functions creates a credential token for the User.
 * The token is necessary for the Header Body "Bearer" and the backend of this app
 * needs to identify and decode the token, so the User can do some CRUD operations
 */
function createJWTToken(id, username) {
    const today = new Date();
    let expire = new Date(today);
    expire.setDate(today.getDate() + 60);

    return jwt.sign({
        id: id,
        username: username,
        exp: parseInt(expire.getTime()/ 1000)
    }, secret);
}

/**
 * Registrates an user into the DB.
 * ENDPOINT: /api/v1.0/users/create
 */
router.post('/create', (req, res, next) => {
    const {
        username,
        password,
        firstname,
        lastname,
        gender,
        dob,
        personalId,
        email,
        address,
        phonenumber,
        latitude,
        longitude,
        role
    } = req.body.user;

    //checks if user exists by email if yes ->  message user already exists
    User.findOne({email: email}, async (err, doc) => {
        if (err) throw new Error(err);
        if (doc) return res.json({mes: 'User already exists'});
    });

    bcrypt.hash(password, saltRound, async(err, hash) => {
        if (err) throw new Error(err);
        User.create({
            username: username,
            password: hash,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            dob: dob,
            personalId: personalId,
            email: email,
            address: address,
            phonenumber: phonenumber,
            latitude: latitude,
            longitude: longitude,
            role: role
        }).then(async (doc) => {
            const token = await createJWTToken(doc._id, doc.username);
            return res.json({
                mes: 'You succesfully registered . . .',
                token: token
            });
        }).catch((err) => {
            return res.json(err);
        });
    });
});

/**
 * Users logs into app!
 * ENDPOINT: /api/v1.0/users/create
 * Responses back with a JWT Token
 */
router.post('/login', (req, res) => {
    const {
        email,
        password
    } = req.body.user;

    User.findOne({email: email}, (err, doc) => {
        if (err) throw new Error(err);

        if (!doc) {
            return res.json({mes: 'User does not exits'});
        } else {
            /**
             * Mongoose returns a document.
             * The id of the document is named "_id"
             */
            bcrypt.compare(password, doc.password, async (err, result) => {
                if (err) throw new Error(err);
                if (result === false) {
                    // WRONG PASSWORD
                    return res.sendStatus(400);
                } else {
                    // VALID PASSWORD 
                    const token = await createJWTToken(doc._id, doc.username);
                    return res.json({
                        mes: 'You succcesfully logged in and get redirected',
                        token: token
                    });
                }
            });
        }
    });
        
});

router.put('/editProfile', auth.required , (req, res, next) => {
    const { id } = req.payload;
    const {
        username,
        password,
        firstname,
        lastname,
        gender,
        dob,
        personalId,
        email,
        address,
        phonenumber,
        latitude,
        longitude,
    } = req.body.user;
    
    User.findById(id, (err, doc) => {
        if (err) throw new Error(err);
        if (doc) {
            doc.username = username;
            doc.password = password;
            doc.firstname = firstname;
            doc.lastname = lastname;
            doc.gender = gender;
            doc.dob = dob;
            doc.personalId = personalId;
            doc.email = email;
            doc.address = address;
            doc.phonenumber = phonenumber;
            doc.latitude = latitude;
            doc.longitude = longitude;

            doc.save().then((value) => {
                return res.json({
                    mes: 'Profile succesfully changed . . .',
                    user: value
                });
            }).catch((err) => {
                console.log(err);
                return res.sendStatus(400);
            });
        } else {
            return res.sendStatus(400);
        }
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(400);
    });
});


router.delete('/deleteProfile', auth.required , (req, res) => {
    const { id } = req.payload;
    User.findById(id, (err, doc) => {
        if (err) return res.send(err);
        bcrypt.compare(req.body.user.password, doc.password, async(err, result) => {
            if (err) throw new Error(err);
            if (result === true) {
                await doc.remove();
                return res.sendStatus(200);
            } else {
                return res.sendStatus(400);
            }
        });
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(400);
    });
});

module.exports = router;