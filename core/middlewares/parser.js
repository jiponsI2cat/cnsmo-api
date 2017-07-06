'use strict';


function bodyParserErrorHandler(err, req, res, next) {
  if (err) {
    res.statusCode = err.statusCode;
    res.json({errors: `${err.name}: ${err.message}`});
  } else {
    next();
  }
}

module.exports = {
  bodyParserErrorHandler: bodyParserErrorHandler
};
