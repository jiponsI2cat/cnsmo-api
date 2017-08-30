'use strict';
var _ = require('lodash');

var config = require('./../config/config');

function replaceUrlToVSDDomain(inUrl) {
  var vsdUrl = config.VSD_BACKEND;
  vsdUrl = removeLastCharIfEquals(vsdUrl, '/');
  return inUrl.replace(config.BASE_URL, vsdUrl);
}

function joinUrl(basePath, path) {
  basePath = removeLastCharIfEquals(basePath, '/');
  path = _.startsWith(path, '/') ? path : '/' + path;
  return basePath + path;
}

function removeLastCharIfEquals(text, char) {
  if (_.endsWith(text, char)) {
    text = text.substring(0, text.length - 1);
  }
  return text;
}

module.exports = {
  replaceUrlToVSDDomain: replaceUrlToVSDDomain,
  removeLastCharIfEquals: removeLastCharIfEquals,
  joinUrl: joinUrl
};
