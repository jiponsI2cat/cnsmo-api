'use strict';
var core = require('../core');
var send = core.helpers.send;
var cnsmoClient = core.helpers.cnsmoClient;

/**
 * This configure a client machine by parameters sended via body
 * from requester. The JSON should contain a valid ip and the
 * other parameters to configure
 * (TODO: eventually it checks if exists client machine)
 */
function configureClientMachine(req, res) {
  const config = req.body;
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
  configureClientMachine: configureClientMachine
};
