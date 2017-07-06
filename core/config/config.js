'use strict';
var _ = require('lodash');

var config = {
};

function get() {
  return config;
}

function set(data) {
  _.assign(config, data);

  if (!config.TOKEN_EXPIRATION_DAYS) {
    config.TOKEN_EXPIRATION_DAYS = 10 ;
  }

  if (!config.JWT_SECRET) {
    config.JWT_SECRET = 'cnsmosecret';
  }

  if (!config.MONGO_URL) {
    config.MONGO_URL = 'mongodb://localhost/cnsmo';
  }

  if (config.LOG_LEVEL) {
    require('log4js').setGlobalLogLevel(config.LOG_LEVEL);
  }
}

module.exports = {
  get: get,
  set: set
};
