'use strict';
var mongoose = require('mongoose');
var config = require('./config/config');
var dbHelper = require('./helpers/db');
var _ = require('lodash');
var init = false;

mongoose.Promise = global.Promise;

function start(configData) {
  config.set(configData);
  if (configData.MONGO_URL) {
    dbHelper.init(configData.MONGO_URL);
  }
  if (!init) {
    _.assign(module.exports, {
      middlewares: {
        auth: require('./middlewares/auth'),
        parser: require('./middlewares/parser')
      },
      models: {
        /*        TokenVSDUser: require('./models/token_vsd_user'),
        */        /*VSDUser: require('./models/vsd_user'),
                CNSMOUser: require('./models/cnsmo_user')*/
      },
      helpers: {
        cnsmoClient: require('./helpers/cnsmo_client'),
        send: require('./helpers/send'),
        db: dbHelper
      },
      tools: {
        swagger: require('./tools/swagger')
      },
      messages: {
        errors: require('./messages/errors')
      },
      initParams: require('./config/initConfig.json')
    });
    init = true;
  }
}

module.exports = {
  start: start
};
