'use strict';

module.exports = function(res, code, message) {
  message = message || {};
  res.statusCode = code;
  res.json(message);
};
