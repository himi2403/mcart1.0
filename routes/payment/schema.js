const Joi = require("joi")

const makePayment = Joi.object().keys({
    customer_Id:Joi.string().required(),
    cardnumber:Joi.string().required(),
    cardname:Joi.string().required(),
    cardholdername:Joi.string().required(),
    CVV:Joi.number().regex(/^[0-9]{3}$/),
    expdate:Joi.date()
})


module.exports = {
    makePayment
}