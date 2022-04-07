const Joi = require("joi")



const addnewaddress = Joi.object().keys({
    pincode : Joi.string().length(6).required(),
    houseNo: Joi.string(),
    streetName:Joi.string(),
    area:Joi.string().required(),
    city:Joi.string().required(),
    isActive:Joi.boolean()  
})

const updateAddress = Joi.object().keys({
    pincode : Joi.string().length(6),
    houseNo: Joi.string(),
    streetName:Joi.string(),
    area:Joi.string(),
    city:Joi.string(),
    isActive:Joi.boolean()  
})


module.exports = {
    addnewaddress,
    updateAddress
}