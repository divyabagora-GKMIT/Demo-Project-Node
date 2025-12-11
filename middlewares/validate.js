const { schema } = require("../validators/address.validation");

const bodyValidate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};

const paramValidate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.params);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};

const paginationValidate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.query);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
}

module.exports = {
    bodyValidate,
    paramValidate,
    paginationValidate
};
