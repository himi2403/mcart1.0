const Joi = require('joi');

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
const login = Joi.object().keys({
    email:Joi.string().required().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    password:Joi.string().min(8).max(35).required()
})

const getId = Joi.object().keys({
    id:Joi.string().required()
})
module.exports = {
    addMerchant,
    login,
    getId
};
