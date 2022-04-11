const Joi = require("joi")

 const addAddress = Joi.object().keys({
    firstName:Joi.string().regex(/^(?=.{1,10}$)[a-z]+(?:[a-z]+)*$/i).min(2).max(39).required(),
    lastName:Joi.string().regex(/^(?=.{1,10}$)[a-z]+(?:[a-z]+)*$/i).min(2).max(35).required(),
    dob:Joi.date().required(),
    gender:Joi.string().required(),
    phoneNumber:Joi.number().required(),
    email:Joi.string().email().lowercase().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).max(35),
    password:Joi.string().required().min(8).max(35),
    countryCode:Joi.number().max(3),
    isActive:Joi.boolean().required(),
    address:Joi.string().allow(null, '')
 })
module.exports ={
   addAddress
}
