const joi = require("joi");

const getListSchema = joi.object({
  body: {},
  query: {},
  params: {},
});

const createSchema = joi.object({
  body: {
    Username: joi.string(),
    Userpassword: joi.string(),
    UserId: joi.number(),
    ClubName: joi.string().required().max(50).min(2),
    ClubMail: joi.string().required().max(50).min(10).email(),
    UniversityId: joi.number().required(),
    Description: joi.string().max(1000)
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
    ClubName: joi.string().max(50).min(2),
    ClubMail: joi.string().max(50).min(10).email(),
    Description: joi.string().max(1000)
  },
  query: {},
  params: { id: joi.string().required() },
});

const getByNameContainsSchema = joi.object({
  body: {},
  query: {
    name: joi.string().required()
  },
  params: {}
})

module.exports = {
  getListSchema,
  createSchema,
  getByIdSchema,
  deleteSchema,
  updateSchema,
  getByNameContainsSchema
};
