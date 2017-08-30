'use strict';

var client = require('./client')
, config = require('./../../config/config');

var authUrl = config.AUTH_BACKEND;

exports.signup = function(data) {
  var args = {
    headers: {'Content-Type': 'application/json' },
    data: data
  };
  return client.post(authUrl + '/signup', args);
};
