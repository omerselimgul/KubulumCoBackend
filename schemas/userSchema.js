const joi = require("joi");

const getByIdSchema = joi.object({
    body: {},
    query: {},
    params: { id: joi.string().required() },
});
const postLoginSchema = joi.object({
    body: {
        Username: joi.string().required().max(50).min(2),
        Userpassword: joi.string().required().max(500).min(8),
    },
    query: {},
    params: {},
});
const createSchema = joi.object({
    body: {
        Username: joi.string().required().max(50).min(2),
        Userpassword: joi.string().required().max(500).min(8),
        Email: joi.string().required().max(50).min(2).email({ tlds: { allow: false } }),
        Universite: joi.string().required().max(50).min(2),
    },
    query: {},
    params: {},
});


module.exports = {
    createSchema,
    postLoginSchema,
    getByIdSchema
}
