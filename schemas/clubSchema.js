const joi = require("joi");

const getListSchema = joi.object({
  body: {},
  query: {},
  params: {},
});

const createSchema = joi.object({
  body: {
    ClubName: joi.string().required().max(50).min(5),
    ClubMail: joi.string().required().max(50).min(10).email(),
    UniversityId: joi.string().required(),
  },
  query: {},
  params: {},
});

const getByIdSchema = joi.object({
  body: {},
  query: {},
  params: { id: joi.string().required() },
});

const deleteSchema = joi.object({
  body: {},
  query: {},
  params: { id: joi.string().required() },
});

const updateSchema = joi.object({
  body: {
    ClubName: joi.string().max(50).min(5),
    ClubMail: joi.string().max(50).min(10).email(),
  },
  query: {},
  params: { id: joi.string().required() },
});

const getByNameContainsSchema = joi.object({
    body:{},
    query:{
        name:joi.string().required()
    },
    params:{}
})

module.exports = {
  getListSchema,
  createSchema,
  getByIdSchema,
  deleteSchema,
  updateSchema,
  getByNameContainsSchema
};
