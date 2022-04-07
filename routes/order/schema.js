const Joi = require("joi")

const getId = Joi.object().keys({
    id : Joi.string().required()
})


module.exports = {getId}