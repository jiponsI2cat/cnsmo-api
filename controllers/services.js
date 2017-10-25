'use strict';
var core = require('../core');
var send = core.helpers.send;
var cnsmoClient = core.helpers.cnsmoClient;

const servicesHelper = require('../helpers/services.js');

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
  cnsmoClient.get('http://127.0.0.1:20092/vpn/server/clients/')
    .then((result) => {
      var resp = Object.keys(result.data).map((key) => {
        var retObj = result.data[key];
        retObj.instanceId = key;
        return retObj;
      });
      return send(res, res.statusCode, resp);
    }).catch((err) => {
      console.log(err);
      const error = {
        code: 500,
        message: 'Error!'
      };
      return send(res, error.code, error);
    });
}

function getFlows(req, res) {
  cnsmoClient.get('http://127.0.0.1:20199/sdn/server/flows/', {})
    .then((result) => {
      const resp = (result.data === {}) ? '' : result.data;
      return send(res, res.statusCode, resp);
    }).catch((err) => {
      console.log(err);
      const error = {
        code: 500,
        message: 'Error!'
      };
      return send(res, error.code, error);
    });
}
function getBlockedTcpPortsByNode(req, res) {

  const instanceId = req.params.instanceId;
  const reqParams = { ssinstanceid: instanceId };
  cnsmoClient.get('http://127.0.0.1:20199/sdn/server/flows/', reqParams)
    .then((result) => {
      if (result.statusCode === 404) {
        const mappedStatusCode = 400;
        const mappedResponse = servicesHelper.formattedResponses.InvalidNode;
        return send(res, mappedStatusCode, mappedResponse);
      }
      var parsedRes = result.data[Object.keys(result.data)[0]].flows;
      const blockedPorts = servicesHelper.extractBlockedPortsByFlows(parsedRes);
      return send(res, res.statusCode, blockedPorts);
    }, (err) => {
      console.log(err);
      const error = {
        code: 520,
        message: 'The origin server returns something unexpected'
      };
      return send(res, error.code, error);
    });
}

function blockByPort(req, res) {
  const bodyReq = req.body;
  const blockByPortUrl = 'http://127.0.0.1:20199/sdn/server/' +
    'filter/blockbyport/';
  cnsmoClient.put(blockByPortUrl, bodyReq)
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

function deleteBlockByPort(req, res) {
  return send(res, 200, '');
}

module.exports = {
  fw: {
    addRule: addRule,
    getRules: getRules
  },
  vpn: {
    getNodes: getNodes
  },
  sdn: {
    getFlows: getFlows,
    getBlockedTcpPortsByNode: getBlockedTcpPortsByNode,
    blockByPort: blockByPort,
    deleteBlockByPort: deleteBlockByPort
  }
};
