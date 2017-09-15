'use strict';
var _ = require('lodash');

const invalidNode = {
  code: 400,
  message: 'Node in the request is invalid'
};

function extractBlockedPortsByFlows(flows) {
  let blockedPorts = [];
  var matchBlockedPort = _.matchesProperty('flow-name', 'portweb-drop');
  if (_.find(flows, matchBlockedPort)) {
    blockedPorts = flows.filter((flow) => {
      if (flow['flow-name'] === 'portweb-drop') {
        return flow;
      }
    }).map((flow) => {
      return {
        destinationPort: flow.match['tcp-destination-port'],
        destinationAddress: flow.match['ipv4-destination']
      };
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
