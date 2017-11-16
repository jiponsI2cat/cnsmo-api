'use strict';

var core = require('../../core');
var users = require('../../controllers/users');
var services = require('../../controllers/services');
var certs = require('../../controllers/certs');
var config = require('../../config/config');
var bodyParser = require('body-parser');
var validators = require('../../helpers/validators');

var ensureAuthorized = core.middlewares.auth.ensureAuthenticated;
var jsonParser = bodyParser.json();

function init(app) {
  const baseUrl = config.BASE_URL;

  // Users
  app.post(
    baseUrl + '/authenticate',
    jsonParser,
    users.authenticate
  );

  // Firewall
  app.post(
    baseUrl + '/services/fw/rules',
    jsonParser,
    ensureAuthorized,
    services.fw.addRule
  );

  app.get(
    baseUrl + '/services/fw/rules',
    jsonParser,
    ensureAuthorized,
    services.fw.getRules
  );

  //Nodes
  app.get(
    baseUrl + '/services/sdn/nodes',
    jsonParser,
    ensureAuthorized,
    services.vpn.getNodes
  );

  app.get(
    baseUrl + '/services/sdn/flows',
    jsonParser,
    ensureAuthorized,
    services.sdn.getFlows
  );

  // TCP Ports (flows)
  app.get(
    baseUrl + '/services/sdn/nodes/:instanceId/blockedTcpPorts',
    jsonParser,
    ensureAuthorized,
    services.sdn.getBlockedTcpPortsByNode

  );

  app.put(
    baseUrl + '/services/sdn/blockbyport',
    jsonParser,
    ensureAuthorized,
    validators.blockByPort,
    services.sdn.blockByPort
  );

  app.delete(
    baseUrl + '/services/sdn/nodes/:instanceId/flows/:flowId',
    ensureAuthorized,
    services.sdn.deleteBlockByPort
  );

  // Certs
  app.post(
    baseUrl + '/certs/clients/:name',
    ensureAuthorized,
    certs.generateCert
  );

  app.get(
    baseUrl + '/certs/clients/:name/key',
    ensureAuthorized,
    certs.getKey
  );

  app.get(
    baseUrl + '/certs/clients/:name/cert',
    ensureAuthorized,
    certs.getCert
  );

  app.get(
    baseUrl + '/certs/clients/:name/config',
    ensureAuthorized,
    certs.getConfig
  );

  app.get(
    baseUrl + '/certs/clients/:name/ca',
    ensureAuthorized,
    certs.getCa
  );
}

module.exports = {
  init: init,
};
