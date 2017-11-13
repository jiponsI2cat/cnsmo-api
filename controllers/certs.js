'use strict';

var core = require('../core');
var send = core.helpers.send;
var cnsmoClient = core.helpers.cnsmoClient;

// const certsHelper = require('../helpers/certs.js');

function generateCert(req, res) {
  const name = req.params.name;
  console.log(req.params);
  cnsmoClient.post(`http://127.0.0.1:20093/vpn/configs/certs/client/${name}/`)
    .then((result) => {
      const response = result.response;
      return send(res, response.statusCode, '');
    }).catch((err) => {
      console.log(err);
      const error = {
        code: 500,
        message: 'Error!'
      };
      return send(res, error.code, error);
    });
}

function getCert(req, res) {
  const name = req.params.name;
  cnsmoClient.getText(`http://127.0.0.1:20093/vpn/configs/certs/client/${name}/`)
    .then((result) => {
      console.log(result);
      const response = result.response;
      console.log(response)
      return send(res, response.statusCode, '');
    }).catch((err) => {
      console.log(err);
      const error = {
        code: 500,
        message: 'Error!'
      };
      return send(res, error.code, error);
    });
}

module.exports = {
  generateCert: generateCert,
  getCert: getCert
};

