'use strict';
var core = require('../core'),
  Joi = require('joi'),
  services = require('../validators/services');

const send = core.helpers.send;
const blockByPortSchema = services.blockByPortSchema;

function blockByPort(req, res, next) {
  const params = req.body;
  Joi.validate(params, blockByPortSchema,
    { stripUnknown: false }, (error, value) => {
      if (error) {
        return send(res, error.code || 400,
          { errors: error.details[0].message });
      }
      next();
    });
}

/* function manageJobs(req, res, next) {
  const params = req.body;
  Joi.validate(params, manageJobsSchema,
    { stripUnknown: true }, (error, value) => {
      if (error) {
        return send(res, error.code || 400,
          { errors: error.details[0].message });
      }
      next();
    });
} */

module.exports = {
  // manageJobs: manageJobs,
  blockByPort: blockByPort
};


