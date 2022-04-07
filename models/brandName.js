const mongoose = require("mongoose")

const brandSchema = new mongoose.Schema({
    brandName:{
        type:String,

    },
    isActive:{
        type:Boolean
    }
})

module.exports = mongoose.model("brand",brandSchema)