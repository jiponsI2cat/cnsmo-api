'use strict';
var core = require('../core');
var send = core.helpers.send;
var cnsmoClient = core.helpers.cnsmoClient;

// ==================== START - FW SERVICES ======================= //

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
    .then((result) => {
      console.log(result);
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
  const stringRule2 = '{"direction":"out","protocol":"udp",' +
    '"dst_port":"8080", "dst_src":"dst", "ip_range":"10.217.123.7/20",' +
    '"action":"rjct"} ';
  const stringRule3 = '{"direction":"out","protocol":"tcp",' +
    '"dst_port":"9080", "dst_src":"src", "ip_range":"10.217.123.7/22",' +
    '"action":"acpt"} ';

  const rule1 = JSON.parse(stringRule1);
  const rule2 = JSON.parse(stringRule2);
  const rule3 = JSON.parse(stringRule3);

  const mockedRules = [
    rule1, rule2, rule3
  ];
  return send(res, 200, mockedRules);
}

/**
 * TODO: this function is actually mocked because internal server hasn't
 * GET method implemented yet.
 * @param {*} req 
 * @param {*} res 
 */
function getNodes(req, res) {
  /* const mockedNodes = [
    {
      instanceId: 'Client.1',
      services: ['vpn', 'sdn', 'fw', 'lb'],
      vpnAddress: '10.10.10.2'
    },
    {
      instanceId: 'Client.2',
      services: ['vpn', 'fw', 'lb'],
      vpnAddress: '10.10.10.3'
    }
  ]; */

  cnsmoClient.post('http://127.0.0.1:20092/vpn/server/clients/')
    .then((result) => {
      
      var resp = Object.keys(result).map((key) => {
        var retObj = result[key];
        retObj.instanceID = key;
        return retObj;
      });
      
      console.log(result);
      const response = resp.response;
      return send(res, response.statusCode, '');
    }).catch((err) => {
      console.log(err);
      const error = {
        code: 500,
        message: 'Error!'
      };
      return send(res, error.code, error);
    });

  /* return send(res, 200, mockedNodes); */
}

// ==================== END - FW SERVICES ======================= //

module.exports = {
  fw: {
    addRule: addRule,
    getRules: getRules
  },
  vpn: {
    getNodes: getNodes
  }
};
