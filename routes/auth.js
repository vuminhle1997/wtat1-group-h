/*jshint esversion: 6 */
// jshint asi: true
/**
 * This file validates JSONWebTokens
 */

let jwt = require('express-jwt'),
    secret = require('../config').secret

function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') 
    return req.headers.authorization.split(' ')[1];

    return null
}

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