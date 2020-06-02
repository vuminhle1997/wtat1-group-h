let router = require('express').Router();
const mongoose = require('mongoose');
let User = mongoose.model('User');

const auth = require('../../auth');
const userController = require('../../../controllers/userController');


router.get('/', auth.required, userController.getUsers);

router.get('/user', auth.optional, userController.getUser);

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

// ENDPOINT: /api/v1.0/users//deleteProfile
router.delete('/deleteProfile', auth.required , userController.deleteProfile);

module.exports = router;