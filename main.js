'use strict';

// Required Modules
var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var path = require('path');
var deasync = require('deasync');
var log4js = require('log4js');

var logger = log4js.getLogger('App');
var core = require('./core');

// Load configuration
process.env.NODE_ENV = process.env.NODE_ENV;
var config = require('./config/config');
var port = process.env.PORT || config.port;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Load core
core.start(
  {
    MONGO_URL: config.MONGO_URL
  }
);

// Set project directory
config.PROJECT_DIR = __dirname;

// Express
var app = express();

app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'PUT', 'DELETE');
  next();
});

const controllersFolder = path.join(__dirname, 'controllers');
const routesFolder = path.join(__dirname, 'routes');

// Swagger
if (config.SWAGGER) {
  const swagger = core.tools.swagger;
  const swaggerURL = '/swagger';
  const swaggerUI = path.join(__dirname, 'doc/swagger');
  const baseUrl = `${config.PROTOCOL}://${config.DOMAIN}:${config.port}`;

  swagger.init(app, baseUrl, swaggerURL, swaggerUI,
    controllersFolder, ['routes.js']);
}

// Istambul
app.use('/coverage', express.static('./public/coverage/lcov-report'));

// Cors
app.use(cors());

// Set Custom routes should start with /cnsmo url structure
/*var ensureAuthorized = core.middlewares.auth.ensureAuthenticated;
*/var apiRoutesPath = path.join(routesFolder, 'configuration', 'apiRoutes');
var apiRoutes = require(apiRoutesPath);
apiRoutes.init(app);

// By default if it's not a a custom route send to VSD API
/*var routes = require(path.join(routesFolder, 'configuration', 'cnsmoRoutes'));
*//*app.use(
  ensureAuthorized,
  routes.processVSDRequest,
  routes.forwardRequestToVSD);*/

// Start Server
app.listen(port, function() {
  logger.info('Express server listening on port ' + port);
});


//Python Module start
function start(cb) {
  // TODO: start communication with cnsmo python module
  // catch error if is not started correctly <eg. throw(err) >
  // call the cb(null, app) when come back the callback of
  // communication with python module
  cb(null, app);
}

// Patch to do testing
// use deasync module only for tests
module.exports = {
  start: deasync(start)
};

// Pre-exit scripts
const preExit = [];

// Catch exit
process.stdin.resume();
process.on('exit', (code) => {
  let i;
  logger.debug('Process exit');
  for (i = 0; i < preExit.length; i++) {
    preExit[i](code);
  }
  process.exit(code);
});

// Catch CTRL+C
process.on('SIGINT', () => {
  logger.debug('\nCTRL+C...');
  process.exit(0);
});

// Catch uncaught exception
process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

// Add pre-exit script
preExit.push((code) => {
  logger.debug('Whoa! Exit code %d, cleaning up...', code);
  /*if (vnsLiteIsStarted) {vnsLite.stop((err) => {});}*/
});
