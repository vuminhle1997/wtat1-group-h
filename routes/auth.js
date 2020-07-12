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
        getToken: getTokenFromHeader,
        algorithms: ['HS256']
    }),
    optional: jwt({
        secret: secret,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader,
        algorithms: ['HS256']
    })
}

module.exports = auth