let router = require('express').Router();
const mongoose = require('mongoose');
let User = mongoose.model('User');

const auth = require('../../auth');
const userController = require('../../../controllers/userController');


router.get('/', auth.required, userController.getUsers);

router.get('/user', auth.optional, userController.getUser);

router.get('/profile', auth.required, userController.getLoggedUser);

router.post('/refresh', auth.required, userController.verifyAndRefresh);

/**
 * Registrates an user into the DB.
 * ENDPOINT: /api/v1.0/users/create
 */
router.post('/create', userController.createUser);

/**
 * Users logs into app!
 * ENDPOINT: /api/v1.0/users/create
 * Responses back with a JWT Token
 */
router.post('/login', userController.loginUser);

router.put('/editProfile', auth.required , userController.editProfile);
router.put('/changePassword', auth.required, (req, res) => {
    res.send("WOW")
})

// ENDPOINT: /api/v1.0/users//deleteProfile
router.delete('/deleteProfile', auth.required , userController.deleteProfile);

module.exports = router;