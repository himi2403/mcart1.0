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
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"address"
    },
    quantity:{
        type:Number,
        default:true
    }, 
    price:{
        type:Number,
    },
    status: {
        type: String, 
        enum: {values:['PENDING', 'APPROVED',"CANCEL","IN-TRANSIT", "DELIVERED"]},
        default: 'PENDING'

      },
      isActive:{
          type:Boolean,
          default:true
      },
      TransactionId:{
          type:String,
          erum:["Successfull","cancel"],
          default:null
      }

},{timestamps:true}
)

module.exports = mongoose.model("order", orderSchema)