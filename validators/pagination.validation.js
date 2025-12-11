const joi = require("joi");

const paginationSchema = joi.object({
    page: joi.number().min(1),
    limit: joi.number().min(1),
    sort: joi.string(),
    order: joi.string().valid("-1", "1"),
});

module.exports = paginationSchema;







