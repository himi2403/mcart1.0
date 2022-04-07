const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
    merchant_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"merchants"
    },
    categoryName:{
        type:String,
    },
    short_Description:{
        type:String,
        minLength:[5,"minimum 5 lenght is required"],
        maxLength:[100,"maximum 20 length is required"]
    },
    long_Description:{
        type:String,
        minLength:[5,"minimum 5 lenght is required"],
        maxLength:[100  ,"maximum 20 length is required"]
    },
    unit:{
        type:Number,
        default:1

    },
    baseCost:{
        type:Number,
        
    },
    discount_cost:{
        type:Number
    },
    discount:{
        type:Number,

    },
    brandName:{
        type:String,
    },
    size:{
        type:String,
        enum:["S","M","L","XL","XXL"]
    },
    serialNo:{
        type:String,
        unique:true
    },
    isActive:{
        type:Boolean
    },
},
{timestamp: true
}
)


productSchema.pre('save', async function (next) {
    try {
        this.discount_cost =this.baseCost -( this.discount*0.01*this.baseCost) 
        next()

    } catch (error) {
        next(error)
    }

})

module.exports = mongoose.model("product", productSchema)