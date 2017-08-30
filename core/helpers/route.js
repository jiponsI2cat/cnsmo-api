'use strict';

var _ = require('lodash')
, path = require('path');

var fileHelper = require('./file');

function getRouteFiles(routesFolder, excludedFiles, cb) {
  fileHelper.getFilesFromDir(routesFolder, (err, files) => {
    if (err) {
      cb([]);
    }
    cb(excludeRouteFiles(files, routesFolder, excludedFiles));
  });
}

function excludeRouteFiles(files, routesFolder, excludedFiles) {
  _.remove(files, function(file) {
    return excludedFiles.indexOf(file) > -1
    || path.extname(file) !== '.js' ;
  });

  files = files.map((file) => {
    return path.join(routesFolder, file);
  });
  return files;
}

module.exports = {
  getRouteFiles: getRouteFiles
};
