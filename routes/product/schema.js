const Joi = require("joi")

const addProduct = Joi.object().keys({
    name:Joi.string(),
    short_Description:Joi.string().min(5).max(50).trim(),
    long_Description:Joi.string().min(10).max(150).trim(),
    unit:Joi.number().default(1),
    baseCost:Joi.number(),
    // discount_cost:Joi.number(),
    brandName:Joi.string(),
    size:Joi.string(),
    serialNo:Joi.string(),
    isActive:Joi.boolean().default(true)
})
module.exports ={
    addProduct
}