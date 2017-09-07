'use strict';

var log4js = require('log4js');
var Q = require('q');
var logger = log4js.getLogger('CNSMO CLIENT');
var Client = require('node-rest-client').Client;
var Request = require('request');

const header = {};
header['Accept'] = 'application/json';
header['Content-Type'] = 'application/json';

/**
 * Client GET method
 * @param {string} url url of server API
 */
function get(url, data) {
  var client = new Client();
  var deferred = Q.defer();
  logger.debug('url:' + url);

  var args = {
    headers: header,
    parameters: data
  };

  client.get(url, args, (data, response) => {
    onData(data, response, deferred);
  }).on('error', (err) => {
    onError(deferred, err);
  });

  return deferred.promise;
}

/* function remove(arg, auth, url, data) {
  var client = new Client();
  var deferred = Q.defer();
  logger.debug('url:' + url);

  header['Authorization'] = 'XREST ' + auth;
  var args = {
    arg: args,
    headers: header
  };

  logger.debug('args:' + JSON.stringify(args));
  logger.debug('options:' + JSON.stringify(auth));

  client.delete(url, args, (data, response) => {
    onData(data, response, deferred);
  }).on('error', (err) => {
    onError(deferred, err);
  });

  return deferred.promise;
} */

/**
 * Client POST method
 * @param {string} url url of server API
 * @param {object} data data that will be passed in body
 * request
 */
function post(url, data) {
  var deferred = Q.defer();
  logger.debug('url:' + url);

  var options = {
    url: url,
    headers: header,
    body: JSON.stringify(data)
  };

  Request.post(options,
    (error, response, body) => {
      console.log(error);
      if (error) {
        onError(deferred, error);
      }
      onData(body, response, deferred);

    });

  return deferred.promise;
}

function put(url, data) {
  var deferred = Q.defer();
  logger.debug('url:' + url);

  var options = {
    url: url,
    headers: header,
    body: JSON.stringify(data)
  };

  Request.put(options,
    (error, response, body) => {
      console.log(error);
      if (error) {
        onError(deferred, error);
      }
      onData(body, response, deferred);

    });

  return deferred.promise;
}

function onData(data, response, deferred) {
  data = (data instanceof Buffer) ? null : data;
  logger.debug('response from cnsmo client ' + JSON.stringify(data));
  deferred.resolve({ data: data, response: response });
}

function onError(deferred, err) {
  const msg = err + 'something went wrong on the request';
  logger.debug(msg, err.request.options);
  deferred.reject(err);
}

module.exports = {
  get: get,
  post: post,
  put: put/*,
  remove: remove */
};


