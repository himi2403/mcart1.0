const Joi = require("joi")

 const addAddress = Joi.object().keys({
    firstName:Joi.string().regex(/^[A-Z]+[A-Za-z]+$/).min(2).max(39).required(),
    lastName:Joi.string().regex(/^[A-Z]+[A-Za-z]+$/).min(2).max(35).required(),
    dob:Joi.date().required(),
    gender:Joi.string().required(),
    phoneNumber:Joi.number().required(),
    email:Joi.string().email().lowercase().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).max(35),
    password:Joi.string().required().min(8).max(35),
    countryCode:Joi.number().max(3),
    isActive:Joi.boolean().required(),
    address:Joi.string().allow(null, '')
 })

 const generateOtp = Joi.object().keys({
   phoneNumber:Joi.string().regex(/^[6-9]{1}[0-9]{10}$/)
 })
 const addresssupdate =Joi.object().keys({
    id:Joi.string()
 })
module.exports ={
   addAddress,
   addresssupdate
}
