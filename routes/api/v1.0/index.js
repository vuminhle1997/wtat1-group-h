let router = require('express').Router();

router.use('/users', require('./users'));
router.use('/reports', require('./reports'));
router.use('/faqs', require('./faqs.js'));

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