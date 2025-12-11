const Joi = require("joi");

const userUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name ",
        "string.min": "Name must be at least 3 characters",
    }),

    contact: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .messages({
            "string.pattern.base": "Contact must be a 10-digit number",
            "string.empty": "Contact is required",
        }),
}).unknown(false)
    .messages({
        "object.unknown": "Updating this field is not allowed",
    });

module.exports = userUpdateSchema;
