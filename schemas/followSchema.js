const joi = require("joi")

const followSchema = joi.object({
    body:{
        UserId: joi.number().required(),
        ClubId: joi.number().required()
    },
    query:{},
    params:{}
})

module.exports = {
    followSchema
}