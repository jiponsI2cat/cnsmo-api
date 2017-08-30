'use strict';
var core = require('../core'),
  Joi = require('joi'),
  domain = require('../validators/domainL3');

const send = core.helpers.send;
const manageJobsSchema = domain.manageJobsSchema;

function manageJobs(req, res, next) {
  const params = req.body;
  Joi.validate(params, manageJobsSchema,
    { stripUnknown: true }, (error, value) => {
      if (error) {
        return send(res, error.code || 400,
          { errors: error.details[0].message });
      }
      next();
    });
}

module.exports = {
  manageJobs: manageJobs
};


