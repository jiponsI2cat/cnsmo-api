'use strict';
var core = require('../core');
var crypto = require('crypto');
var send = core.helpers.send;
var credentials = core.initParams.credentials;
var auth = core.middlewares.auth

/**
 * Function for auth with username and password. it create and return a token
 * after save it in a db
 */
function authenticate(req, res) {
    const reqCredentials = req.body;
    let result;
    if (reqCredentials.username === credentials.username &&
        reqCredentials.password === credentials.password) {

        // check if user has token, if has and isValid 
        // respond: you are already logged in
        // else...
        let tokenExists = false;

        if (!tokenExists) {
            crypto.randomBytes(128, (err, buffer) => {
                var token = buffer.toString('base64');

                //save token, cb=>
                result = { code: 200, response: { token: auth.createToken(reqCredentials) } };
                send(res, result.code, result.response);

            });
        } else {
            // this branch will be removed when will check if user has token
            send(res, result.code, result.response);
        }


    } else {
        const error = {
            code: 404,
            message: "username or password not valid"
        }
        return send(res, error.code || 520, error);
    }
}

module.exports = {
    authenticate: authenticate
};

