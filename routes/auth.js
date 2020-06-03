/*jshint esversion: 6 */
// jshint asi: true
/**
 * This file validates JSONWebTokens
 */

let jwt = require('express-jwt'),
    secret = require('../config').secret

const getTokenFromHeader = require('../config/helper').getTokenFromHeader;

let auth = {
    required: jwt({
        secret: secret,
        userProperty: 'payload',
        getToken: getTokenFromHeader
    }),
    optional: jwt({
        secret: secret,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
}

module.exports = auth