const mongoose = require('mongoose');
let User = mongoose.model('User');
let Report = mongoose.model('Report');
let IA = mongoose.model('InfectedArea');

const saltRound = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const nodemailer = require('nodemailer');
const getTokenFromHeader = require('../config/helper').getTokenFromHeader;

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

async function sendVerificationMail(firstname, lastname, email, hash, id) {
    const transporter = nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
            user: `${process.env.GMAIL_USER}`,
            pass: `${process.env.GMAIL_PASS}`
        },

    });

    const receiver = await transporter.sendMail({
        from: `"Corona Report" <${process.env.GMAIL_USER}>`,
        to: `${email}`,
        subject: `Corona Report - Account Verification Email`,
        text: `Hi, ${firstname} ${lastname} \n Please verify your email address <a href="${process.env.HOSTNAME}/api/verify?id=${id}&hash=${hash}">Click here</a>`,
        html: `
            <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            </head>
            <body>
                <h4>Corona Report</h4>
                <h5>Verification Email</h5>
                <p>Hi ${lastname}, ${firstname}</p>
                <p>Please activate your account by clicking on this button</p>
                <a href="${process.env.HOSTNAME}/api/verify?id=${id}&hash=${hash}">
                    <button>Activate</button>
                </a>

                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
            </body>
            </html>
            </body>
            </html>
        `

    });

    console.log("Message sent: %s", receiver.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(receiver));

    const sender = await transporter.sendMail({
        from: `"Corona Report" <${process.env.GMAIL_USER}>`,
        to: `${process.env.GMAIL_USER}`, 
        subject: `Corona Report - New User`,
        html: `
            <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            </head>
            <body>
                <h4>Corona Report</h4>
                <h5>New User</h5>
                <p>Name: ${lastname}, ${firstname}</p>
                <span>Email: ${email}</span>

                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
            </body>
            </html>
            </body>
            </html>
        `,
        text: `New User: ${lastname} ${firstname}, email: ${email}`
    });

    console.log("Message sent: %s", sender.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sender));
}

async function verifyAndRefresh(req, res) {
    const token = getTokenFromHeader(req);
    const claims = jwt.verify(token, secret)
    if (!claims) {
        return res.status(401).json({mes: "Wrong"});
    } else {
        const newToken = await createJWTToken(claims.id, claims.username);
        return res.status(200).json({token: newToken, claims})
    }
    
}

function getUsers(req, res) {
    let query = {};
    const limit = 20;
    let offset = 0;

    Promise.all([
        req.query.username ? User.findOne({username: req.query.username}): null,
        req.query.firstname ? User.findOne({firstname: req.query.firstname}): null,
        req.query.lastname ? User.findOne({lastname: req.query.lastname}): null
    ]).then((results) => {
        const username = results[0];
        const firstname = results[1];
        const lastname = results[2];

        return res.json(results);
    });
}

function getUser(req, res) {
    const id = req.query.id;
    User.findById(id, (err, doc) => {
        if (err) {
            console.error(err);
            return res.status(404);
        } 
        if (doc) return res.json(doc.depopulate('password'));

        return res.status(404).json({mes:"not found"});
    });
}

function getLoggedUser(req, res) {
    User.findById(req.payload.id, (err, doc) => {
        if (err) {
            console.error(err);
            return res.status(404);
        } 
        if (doc) return res.json(doc.depopulate('password'));

        return res.status(404).json({mes:"not found"});
    });
}

async function createUser(req, res) {
    if (!req.body.user) {
        return res.sendStatus(500);
    } else {
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

        User.findOne({email: email}, (err, user) => {
            if (user) return res.status(401).json({
                mes: 'User already exists . . .'
            });
            if (err) return res.sendStatus(500).json({
                mes: 'Something went wrong . . .'
            });

            bcrypt.hash(password, saltRound, (err, hash) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        mes: 'Something went wrong . . .'
                    });
                }
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
                    return res.status(200).json({
                        mes: 'You succesfully registrrated . . .',
                        token: token
                    });
                }).catch((err) => {
                    return res.status(500).json(err);
                });
            });
        });
    }
}

function loginUser(req, res) {
    const {
        email,
        password
    } = req.body.user;

    User.findOne({email: email}, (err, doc) => {
        if (err) throw new Error(err);

        if (!doc) {
            return res.status(201).json({mes: 'User does not exits'});
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
                    return res.status(200).json({
                        mes: 'You succcesfully logged in and get redirected',
                        token: token
                    });
                }
            });
        }
    });
}

function editProfile(req, res) {
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
}

function deleteProfile(req, res) {
    const { id } = req.payload;
    User.findById(id, (err, doc) => {
        if (err) return res.send(err);
        bcrypt.compare(req.body.user.password, doc.password, async(err, result) => {
            if (err) throw new Error(err);
            if (result === true) {
                await Report.find({submitter: mongoose.Types.ObjectId(id)}, (err, reso) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }
                    if (reso) {
                        reso.forEach(async (docReport) => {
                            await IA.findByIdAndDelete(doc._id);
                            await docReport.remove();
                        });
                    }
                });

                await doc.remove();

                return res.status(200).json({mes: "Deleted profile and all related stuffs"});
            } else {
                return res.sendStatus(400);
            }
        });
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(400);
    });
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    createUser: createUser,
    loginUser: loginUser,
    editProfile: editProfile,
    deleteProfile: deleteProfile,
    verifyAndRefresh: verifyAndRefresh,
    getLoggedUser: getLoggedUser
}