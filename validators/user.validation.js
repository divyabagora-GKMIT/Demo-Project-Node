const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "any.required": "Name is required",
  }),

  email: Joi.string().email().max(254).messages({
    "string.email": "Invalid email format",
  }),

  contact: Joi.string()
    .pattern(/^[1-9][0-9]{9}$/)
    .messages({
      "string.pattern.base": "Contact must be a 10-digit number",
      "string.empty": "Contact is required",
    }),
}).unknown(false);

module.exports = userSchema;
