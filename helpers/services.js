'use strict';
var _ = require('lodash');

const invalidNode = {
  code: 400,
  message: 'Node in the request is invalid'
};

const flowsArrayHasFlowsWithPortwebDrop = function(flows) {
  const matchBlockedPort = _.matchesProperty('flow-name', 'portweb-drop');
  return _.find(flows, matchBlockedPort);
};
const flowHasBlockedPort = function(flow) {
  return flow['flow-name'] === 'portweb-drop';
};
const formattedFlow = function(flow) {
  return {
    destinationPort: flow.match['tcp-destination-port'],
    destinationAddress: flow.match['ipv4-destination'],
    flowId: flow.id
  };
};

function extractBlockedPortsByFlows(flows) {
  let blockedPorts = [];
  if (flowsArrayHasFlowsWithPortwebDrop && flows) {
    blockedPorts = flows.filter(flowHasBlockedPort).map((flow) => {
      return formattedFlow(flow);
    });
  }
  return blockedPorts;
}

module.exports = {
  formattedResponses: {
    invalidNode: invalidNode
  },
  extractBlockedPortsByFlows
};
