'use strict';

var _ = require('lodash')
, path = require('path');

var config = _.assign(
require(path.join(__dirname, '/../config/env/', (process.env.NODE_ENV || 'development') + '.js')) || {}
);

module.exports = config;
