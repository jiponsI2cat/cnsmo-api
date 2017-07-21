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
function configureFirewall(req, res) {
  const bodyReq = req.body;
  cnsmoClient.post('http://127.0.0.1:20095/fw/', bodyReq)
    .then(function(result) {
      console.log(result);
      const response = result.response;
      return send(res, response.statusCode, '');
    }).catch(function(err) {
      console.log(err);
      const error = {
        code: 500,
        message: 'Error!'
      };
      return send(res, error.code, error.message);
    });
}

module.exports = {
  configureFirewall: configureFirewall
};
