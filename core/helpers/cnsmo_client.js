'use strict';

var log4js = require('log4js');
var Q = require('q');
var logger = log4js.getLogger('CNSMO CLIENT');
var Client = require('node-rest-client').Client;

function getVSD(header, arg, auth, url) {
/*  var client = new Client();
  var deferred = Q.defer();
  logger.debug('url:' + url);

  header['Authorization'] = 'XREST ' + auth;
  var args = {
    arg: args,
    headers: header
  };

  logger.debug('args:' + JSON.stringify(args));
  logger.debug('options:' + JSON.stringify(auth));

  client.get(url, args, (data, response) => {
    onData(data, response, deferred);
  }).on('error', function(err) {
    onError(deferred, err);
  });

  return deferred.promise;*/
}

function deleteVSD(header, arg, auth, url, data) {
/*  var client = new Client();
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
  }).on('error', function(err) {
    onError(deferred, err);
  });

  return deferred.promise;*/
}

function postVSD(header, arg, auth, url, data) {
/*  var client = new Client();
  var deferred = Q.defer();
  logger.debug('url:' + url);

  header['Authorization'] = 'XREST ' + auth;
  header['X-Requested-With'] = 'XMLHttpRequest';
  header['Content-Type'] = 'application/json';

  var args = {
    arg: args,
    headers: header,
    data: data
  };

  logger.debug('args:' + JSON.stringify(args));
  logger.debug('options:' + JSON.stringify(auth));

  client.post(url, args, (data, response) => {
    onData(data, response, deferred);
  }).on('error', function(err) {
    onError(deferred, err);
  });

  return deferred.promise;*/
}

function putVSD(header, arg, auth, url, data) {
/*  var client = new Client();
  var deferred = Q.defer();
  logger.debug('put url:' + url);

  header['Authorization'] = 'XREST ' + auth;
  header['X-Requested-With'] = 'XMLHttpRequest';
  header['Content-Type'] = 'application/json';

  var args = {
    arg: args,
    headers: header,
    data: data
  };

  logger.debug('update args:' + JSON.stringify(args));
  logger.debug('update options:' + JSON.stringify(auth));

  client.put(url, args, (data, response) => {
    onData(data, response, deferred);
  }).on('error', (err) => {
    onError(deferred, err);
  });

  return deferred.promise;*/
}

function onData(data, response, deferred) {
  data = (data instanceof Buffer) ? null : data;
  logger.debug('response from vsd client' + JSON.stringify(data));
  deferred.resolve({data: data, response: response});
}

function onError(deferred, err) {
  const msg = err + 'something went wrong on the request';
  logger.debug(msg, err.request.options);
  deferred.reject(err);
}

module.exports = {
/*
*/
};
