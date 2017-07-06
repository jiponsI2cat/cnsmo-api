'use strict';

var Q = require('q');
var Client = require('node-rest-client').Client;

exports.post = function(url, args, options) {

  var deferred = Q.defer();
  options = (options) ? options : {};
  var client = new Client(options);
  client.post(url, args, function(data, response) {
    deferred.resolve({data: data, response: response});
  }).on('error', function(err) {
    deferred.resolve({error: err});
  });
  return deferred.promise;
};
