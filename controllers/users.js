'use strict';
var core = require('../core');
var send = core.helpers.send;
var credentials = core.initParams.credentials;
var auth = core.middlewares.auth;

/**
 * This function provide a token to a requester by validating
 * its credentials (username and password). The credentials
 * should match with credentials stored in a init JSON file
 * generated when current VM is created.
 */
function authenticate(req, res) {
  const reqCredentials = req.body;
  let result;
  try {
    if (reqCredentials.username === credentials.username &&
      reqCredentials.password === credentials.password) {
      result = {
        code: 200,
        response: {
          token: auth.createToken(reqCredentials)
        }
      };
      send(res, result.code, result.response);
    } else {
      const error = {
        code: 401,
        message: 'Username or password not valid!'
      };
      throw error;
    }
  } catch (e) {
    return send(res, e.code, e);
  }
}

module.exports = {
  authenticate: authenticate
};

