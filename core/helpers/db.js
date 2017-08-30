
'use strict';

var mongoose = require('mongoose');

module.exports = {
  db: null,
  init: function(mongoUrl) {
    if (!module.exports.db) {

      module.exports.db = mongoose.createConnection(mongoUrl);
    }
    return module.exports.db;
  }
};
