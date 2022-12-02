const joi = require("joi");

const followSchema = joi.object({
  body: {
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

const getFollowerListByClubIdSchema = joi.object({
  body: {},
  query: { clubId: joi.string().required() },
  params: {},
});


module.exports = {
  followSchema,
  getFollowListByUserIdSchema,
  getFollowerListByClubIdSchema
};
