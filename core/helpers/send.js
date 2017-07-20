'use strict';

module.exports = function(res, code, message) {
  message = message || {};
  res.statusCode = code;
  console.log(message);
  res.json(message);
};
