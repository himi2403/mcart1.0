const Joi = require("joi")



let addnewaddress = Joi.object().keys({
    customer_Id:Joi.string().required(),
    pincode : Joi.string().length(6).required(),
    houseNo: Joi.string().required(),
    streetName:Joi.string().required(),
    area:Joi.string().required(),
    city:Joi.string().required(),
    isActive:Joi.boolean()  
})

let updateAddress = Joi.object().keys({
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