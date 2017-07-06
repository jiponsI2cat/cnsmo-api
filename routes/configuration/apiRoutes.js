'use strict';

var core = require('../../core');

var users = require('../../controllers/users')
var config = require('../../config/config');
var bodyParser = require('body-parser');
var validators = require('../../helpers/validators');


var ensureAuthorized = core.middlewares.auth.ensureAuthenticated;
var jsonParser = bodyParser.json();

function init(app) {
  const baseUrl = config.BASE_URL;

  // Authenticate
  app.post(
    baseUrl + '/authenticate',
    jsonParser,
    users.authenticate  
  )

}

module.exports = {
  init: init,
};
