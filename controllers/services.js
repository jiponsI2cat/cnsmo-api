'use strict';
var core = require('../core');
var send = core.helpers.send;
var cnsmoClient = core.helpers.cnsmoClient;

/**
 * This configure a client machine by parameters sended via body
 * from requester. The JSON should contain a valid ip and the
 * other parameters to configure. This forward the request to
 * Python SDN Server, process the response (eventually process
 * and saving received data)
 */
function addRule(req, res) {
  const bodyReq = req.body;
  cnsmoClient.post('http://127.0.0.1:20095/fw/', bodyReq)
    .then(function (result) {
      console.log(result);
      const response = result.response;
      return send(res, response.statusCode, '');
    }).catch(function (err) {
      console.log(err);
      const error = {
        code: 500,
        message: 'Error!'
      };
      return send(res, error.code, error);
    });
}

/**
 * TODO: this function is actually mocked because internal server hasn't
 * GET method implemented yet.
 * @param {*} req
 * @param {*} res
 */
function getRules(req, res) {
  const stringRule1 = '{"direction":"out","protocol":"tcp",' +
    '"dst_port":"80", "dst_src":"dst", "ip_range":"10.217.123.7/20",' +
    '"action":"acpt"} ';
  const rule = JSON.parse(stringRule1);
  const rule1 = rule;
  const rule2 = rule;
  const rule3 = rule;

  rule2.port = '8080';
  rule2.protocol = 'udp';
  rule3.port = '4200';
  rule3.protocol = 'tcp';
  rule3.dst_src = 'src';

  const mockedRules = [
    rule1, rule2, rule3
  ];
  return send(res, 200, mockedRules);
}

module.exports = {
  fw: {
    addRule: addRule,
    getRules: getRules
  }
};
