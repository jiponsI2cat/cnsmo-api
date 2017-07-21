'use strict';

module.exports = function(res, code, message) {
  message = message || {};
  res.statusCode = code;
  console.log("MESSAGE:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::",
  message);
  res.json();
};
