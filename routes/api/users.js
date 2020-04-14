let router = require('express').Router();
const mongoose = require('mongoose');
let User = mongoose.model('User');

router.get('/user', (req, res, next) => {
    res.json('ASD')
});

router.post('/users', (req, res, next) => {
    const {
        username,
        email,
        password
    } = req.body.user;

    
    let user = new User();
    user.username = username;
    user.email = email;
    user.setPassword(password);


    return user.save().then(async (doc) => {
        // await doc.populate('username email', (err, res) => {
        //     if (err) throw new Error(err);
        //     res.json(res);
        // });
        console.log(`${user} is stored`)
        res.json({
            mes: "ready",
            data: doc
        });
    }).catch(next);
});

router.put('/users', (req, res, next) => {

});

router.delete('/users', (req, res, next) => {

});

module.exports = router;