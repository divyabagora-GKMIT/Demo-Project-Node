const Joi = require("joi");

const addressSchema = Joi.object({
    userId: Joi.number().required(),

    addressLine: Joi.string().min(5).required(),

    city: Joi.string().min(3).max(20).required(),

    state: Joi.string().min(3).max(20).required(),

    country: Joi.string()
        .min(3)
        .max(20)
        .required(),

    zip: Joi.string()
        .length(6)
        .pattern(/^[1-9][0-9]{5}$/)
        .required()
        .messages({
            "string.pattern.base": "ZIP must be 6 digits and cannot start with 0",
        })
})
    .unknown(false)
    .messages({
        "object.unknown": "this field is not allowed",
    });

module.exports = addressSchema;
