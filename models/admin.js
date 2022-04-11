const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName: {
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["Manager","Ceo","Vp"]
    }
},{timestamps:true})

module.exports = mongoose.model("admin", adminSchema)