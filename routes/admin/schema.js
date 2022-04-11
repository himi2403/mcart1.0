const Joi = require("joi")

const addAdmin= Joi.object().keys({
    firstName : Joi.string().regex(/^[a-zA-Z]/).required(),
    lastName: Joi.string().regex(/^[a-zA-Z]/).required(),
    email: Joi.string().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
    password:Joi.string().required(),
    role:Joi.string().required()
})
const update = Joi.object().keys({
    id:Joi.string().required()
})
const Login = Joi.object().keys({
    email:Joi.string().required(),
    password:Joi.string().required()
})
const addProduct = Joi.object().keys({
    name:Joi.string(),
    short_Description:Joi.string().min(5).max(50).trim(),
    long_Description:Joi.string().min(10).max(150).trim(),
    unit:Joi.number().min(1),
    baseCost:Joi.number(),
    // discount_cost:Joi.number(),
    brandName:Joi.string(),
    size:Joi.string(),
    serialNo:Joi.string(),
    isActive:Joi.boolean().default(true)
})
const addMerchant = Joi.object().keys({
    firstName: Joi.string().min(3).max(28).required(),
    lastName: Joi.string().min(3).max(28).required(),
    dateOfBirth: Joi.string().required(),
    phoneNumber:Joi.number().required(),
    email: Joi.string().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
    password:Joi.string().required(),
    countryCode:Joi.string().required(),
    address:{
        houseNo:Joi.string(),
        streetaddress:Joi.string(),
        locality:Joi.string(),
        region:Joi.string(),
        country:Joi.string()
    }
})
module.exports = {
    addAdmin,
    update,
    Login,
    addProduct,
    addMerchant
}