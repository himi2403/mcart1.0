const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    Name:{
        type:String,
    },
    description:{
        type:String
    },
    isActive:{
        type:Boolean,
        default: true
    }
})

module.exports = mongoose.model("category",categorySchema)