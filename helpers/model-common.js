'use strict';

var async = require('async');
var _ = require('lodash');
var core = require('../core');

var dbHelpers = core.helpers.db;

function get(modelName, select, vnsId, cb) {
  var model = dbHelpers.db.model(modelName);
  model.findOne({'vns.id': vnsId}).select(select).exec((err, result) => {
    cb(err, result);
  });
}

function getAll(modelName, search, select, pagination, cb) {
  var model = dbHelpers.db.model(modelName);
  function find(cb) {
    return model.find(search, select, pagination, cb);
  }

  function count(cb) {
    return model.count(search, cb);
  }

  var funcs = [];
  funcs.push(find);
  if (_.isEmpty(pagination) === false) {
    funcs.push(count);
  }
  let response;
  async.parallel(funcs, (err, results) => {
    if (err && !_.isEmpty(err)) {
      err = _.first(err);
    } else {
      response = {data: results[0]};
      if (results[1]) {
        response.count = results[1];
      }
    }
    cb(err, response);
  });
}

module.exports = {
  get: get,
  getAll: getAll
};
