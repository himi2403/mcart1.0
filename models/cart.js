const mongoose = require("mongoose")

let cartSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
    },

    price:{
        type:Number,
        default:0
    },
    products: [{
       productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        },
        quantity: {
            type: Number,
            // required: true,
            // min: [1, "Quantity can not be less then 1."],
          }, }],

   

},

    {
        timestamps:true
    }
)

module.exports = mongoose.model("cart", cartSchema)