const Joi = require("joi");

const paramSchema = Joi.object({
  id: Joi.number().messages({
    "number.base": "id value is not valid, It must be a number",
  }),
});

module.exports = paramSchema;
