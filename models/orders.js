const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"product"
    },
    customer_id:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"customer"
    },
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart"
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"address"
    },
    email:{
        type:String
    },
    status: {
        type: String, 
        enum: {values:['PENDING', 'APPROVED',"CANCEL","IN-TRANSIT", "DELIVERED"]},
        default: 'PENDING'

      },
      isActive:{
          type:Boolean,
          default:true
      }

},{timestamps:true}
)

module.exports = mongoose.model("order", orderSchema)