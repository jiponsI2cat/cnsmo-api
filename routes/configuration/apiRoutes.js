'use strict';

var core = require('../../core');

var users = require('../../controllers/users');
var services = require('../../controllers/services');
var config = require('../../config/config');
var bodyParser = require('body-parser');
/*var validators = require('../../helpers/validators');
*/

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

  // Services
  app.post(
    baseUrl + '/services/fw/rules',
    jsonParser,
    ensureAuthorized,
    services.addRule
  );

  app.get(
    baseUrl + '/services/fw/rules',
    jsonParser,
    ensureAuthorized,
    services.getRule
  );

  // Test ensureAuthorize
/*  app.get(
    baseUrl + '/ensureAuth',
    jsonParser,
    ensureAuthorized,
    function(req, res, next) {
      res.end();
    }
  );*/

}

module.exports = {
  init: init,
};
