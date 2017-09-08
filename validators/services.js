'use strict';

var Joi = require('joi');

const blockByPortSchema = Joi.object().keys({
  'tcp-destination-port': Joi.string().required(),
  'ip4-destination': Joi.string().required(),
  'ssinstanceid': Joi.string().required()
});

module.exports = {
  blockByPortSchema: blockByPortSchema
};
