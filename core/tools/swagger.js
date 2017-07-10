'use strict';

var swagger = require('swagger-express')
  , express = require('express')
  , log4js = require('log4js');

var logger = log4js.getLogger('Tools.Swagger');
var routesHelper = require('../helpers/route');

function init(app, urlBasePath, swaggerURL, swaggerUI,
  controllersFolder, excluded) {
  logger.info(`Initializing swagger ${urlBasePath}${swaggerURL} ...`);

  app.use(swaggerURL, express.static(swaggerUI));

  routesHelper.getRouteFiles(controllersFolder, excluded, (files) => {

    logger.debug('Swagger api files: ', files.join(', '));

    var swaggerMiddleware = function() {
      return swagger.init(app, {
        apiVersion: '0.0.1',
        swaggerVersion: '1.0',
        basePath: urlBasePath,
        swaggerURL: swaggerURL,
        swaggerJSON: '/api-docs.json',
        swaggerUI: swaggerUI,
        apis: files
      });
    };
    app.use(swaggerMiddleware());

  });
}


module.exports = {
  init: init
};
