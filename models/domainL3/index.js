'use strict';

var mongoose = require('mongoose');
var core = require('../../core');

const modelName = 'DomainL3';

var dbHelpers = core.helpers.db;
var Schema = mongoose.Schema;

var methods = require('./methods');

var DomainL3Schema = new Schema({
  vns: {
    id: {type: String, required: true, unique: true},
    data: {},
  },
  vnsLite: {
    id: {type: Number, required: true, unique: true},
    vplsId: {type: Number, required: true, unique: true},
    data: {},
  },
  organizationId: {type: String, required: true}
});

DomainL3Schema = methods.init(DomainL3Schema, modelName);
var DomainL3 = dbHelpers.db.model(modelName, DomainL3Schema);
module.exports = DomainL3;
