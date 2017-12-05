'use strict'

var core = require('../core');
var send = core.helpers.send;
var cnsmoClient = core.helpers.cnsmoClient;

// const dnsRecordsHelper = require('../helpers/dnsRecords.js');

function addDnsRecord(req, res) {
  const name = req.params.name;

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

module.exports = {
  generateCert: generateCert
};
