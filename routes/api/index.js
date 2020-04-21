let router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.use('/v1.0', require('./v1.0'));

router.get('/verify', (req, res) => {
    if (req.query) {
        const hash = req.query.hash;
        const id = req.query.id;
       
        User.findById(id, (err, user) => {
            if (err) {
                console.error(err);
                return res.sendStatus(404);
            }
            if (user.password === hash) {
                user.active = true;
                user.save()
                    .then((doc) => {
                        return res.status(200).json(doc.populate('-password'));
                    })
                    .catch(err => {
                        console.error(err);
                        return res.sendStatus(500);
                    })
            } else {
                return res.sendStatus(401);
            }
        });
    } else {
        return res.sendStatus(500);
    }
});

router.use(function(err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.sendStatus(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key) {
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        });
    }
    return next(err);
});

module.exports = router;