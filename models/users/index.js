'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var db = require('../helpers/db').db;

const modelName = 'User';

var UserSchema = new Schema({
  id: {type: String, required: true, unique: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  joined: { type: Date, default: Date.now() },
  password: {type: String, required: true}
});

UserSchema = methods.init(UserSchema, modelName);
var User = dbHelpers.db.model(modelName, UserSchema);
module.exports = User;

