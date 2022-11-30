const joi = require("joi");

const getByUserIdSchema = joi.object({
    body: {},
    query: {},
    params: {},
});
const getByKulupIdSchema = joi.object({
    body: {},
    query: {},
    params: { id: joi.string().required() },
});
const addAuthorSchema = joi.object({
    body: {
        User: joi.required(),
        Club: joi.required()
    },
    query: {},
    params: {},
});
const deleteAuthorSchema = joi.object({
    body: {
        User: joi.required(),
        Club: joi.required()
    },
    query: {},
    params: {},
});
module.exports = {
    getByUserIdSchema,
    getByKulupIdSchema,
    addAuthorSchema,
    deleteAuthorSchema
};