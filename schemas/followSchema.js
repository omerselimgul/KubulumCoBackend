const joi = require("joi");

const followSchema = joi.object({
  body: {
    UserId: joi.number().required(),
    ClubId: joi.number().required(),
  },
  query: {},
  params: {},
});

const getFollowListByUserIdSchema = joi.object({
  body: {},
  query: { userId: joi.string().required() },
  params: {},
});

module.exports = {
  followSchema,
  getFollowListByUserIdSchema
};
