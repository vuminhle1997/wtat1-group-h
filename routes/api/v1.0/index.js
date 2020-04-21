let router = require('express').Router();

// router.get('/', function(req, res, next) {
//     res.send('Hello v1.0 GET API from TechBrij.com');
// });

// router.post('/', function(req, res, next) {
//     res.send('Hello v1.0 POST API from TechBrij.com');
// });

router.use('/users', require('./users'));
router.use('/reports', require('./reports'));
router.use('/faqs', require('./faqs.js'));
// router.use('/articles', require('./articles'))
// router.use('/profiles', require('./profiles'))


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