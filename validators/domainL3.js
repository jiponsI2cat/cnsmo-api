'use strict';
var _ = require('lodash'),
  Joi = require('joi');

function isInvalid(method, data) {
  let msg;

  const limit = 60;
  switch (method) {
    case 'add':
      if (!data || !data.name
        || !(typeof data.name === 'string')
        || !data.templateID
        || !(typeof data.templateID === 'string')) {
        msg = 'Invalid Request: Missing or bad format parameters';
      } else if (_.size(_.kebabCase(data.name)) > limit) {
        //80 characters is the limit in the VSR
        //We leave 20 characters for pre/post padding
        msg = 'Invalid Request: Length name should have ';
        msg += `less than ${limit} characters`;
      }
      break;
    default:
      break;
  }
  return msg;
}

const manageJobsSchema = Joi.object().keys({
  command: Joi.string().required()
});

module.exports = {
  isInvalid: isInvalid,
  manageJobsSchema: manageJobsSchema
};

