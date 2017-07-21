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
  /*   const data = req.body;*/
  const testData = {
    direction: 'out',
    protocol: 'tcp',
    dst_port: '80',
    dst_src: 'dst',
    ip_range: '10.217.123.7/20',
    action: 'acpt'
  };
  cnsmoClient.post('http://127.0.0.1:20095/fw/', testData, (err, result) => {
    if (err) {
      console.log(err);
      const error = {
        code: 500,
        message: 'Error!'
      };
      return send(res, error.code, error);
    }
    return send(res, result.code, result.response);
  });
}

module.exports = {
  configureFirewall: configureFirewall
};
