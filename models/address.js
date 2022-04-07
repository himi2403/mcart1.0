const mongoose = require("mongoose")
// const schema = mongoose.Schema

const addressSchema = new  mongoose.Schema({
    customer_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"customers"
        },
        houseNo:{
            type:String
        },
        streetName:{
            type:String
        },
        area:{
            type:String
        },
        city:{
            type:String
        },
        pincode:{
            type:String,

        },
        isActive:{
            type:Boolean
        }
})
const address = mongoose.model("address", addressSchema)
module.exports = address 
