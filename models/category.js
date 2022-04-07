const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    categoryName:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default: true
    }
})

module.exports = mongoose.model("category",categorySchema)