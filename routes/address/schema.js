const Joi = require("joi")



let addnewaddress = Joi.object().keys({
    customer_Id:Joi.string().required(),
    pincode : Joi.string().length(6).required(),
    houseNo: Joi.string().required().regex(/^\w+(?:\s+\w+)*$/),
    streetName:Joi.string().alphanum().required().regex(/^\w+(?:\s+\w+)*$/),
    area:Joi.string().required(),
    city:Joi.string().required(),
    isActive:Joi.boolean()  
})

let updateAddress = Joi.object().keys({
    pincode : Joi.string().length(6),
    houseNo: Joi.string(),
    streetName: Joi.string().max(50).regex(/^\w+(?:\s+\w+)*$/),
    area:Joi.string(),
    city:Joi.string(),
    isActive:Joi.boolean()  
})


module.exports = {
    addnewaddress,
    updateAddress
}