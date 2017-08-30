'use strict';

var request = require('request');

var parser = require('../../helpers/parser');


function processVSDRequest(req, res, next) {
  //Do not pass SDPN token to VSD API
  delete req.query.token;

  req.headers['X-Nuage-Organization'] = req.vsd.enterpriseName;
  req.headers['Authorization'] = 'XREST ' + req.vsd.token;
  req = setNuageQueryParamsInHeaders(req);

  next();
}

function setNuageQueryParamsInHeaders(req) {
  var query = Object.assign({}, req.query);

  for (var p in query) {
    if (p && p.indexOf('X-Nuage-') > -1) {
      req.headers[p] = query[p];
      delete query[p];
    }
  }
  req.query = query;
  return req;
}

function forwardRequestToVSD(req, res) {
  var url = require('url').parse(req.originalUrl).pathname;
  url = parser.replaceUrlToVSDDomain(url);
  var params = { qs: req.query, uri: url, headers: req.headers};
  var response = request(params);
  req.pipe(response).pipe(res);
}


module.exports = {
  forwardRequestToVSD: forwardRequestToVSD,
  processVSDRequest: processVSDRequest
};
