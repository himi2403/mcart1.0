const Joi = require("joi")

const getId = Joi.object().keys({
product_id:Joi.string().required(),
customer_id:Joi.string().required(),
address:Joi.string().required(),
quantity:Joi.number().required(),
price:Joi.number(),
status:Joi.string(),
  isActive:Joi.boolean().required()

})

const updateOrder = Joi.object().keys({
    status:Joi.string().required()

})
const cancelOrder = Joi.object().keys({
    order_id:Joi.string().required(),
    customer_id:Joi.string().required()
})
module.exports = {getId, updateOrder, cancelOrder}