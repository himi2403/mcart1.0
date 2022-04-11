const mongoose =require("mongoose")

const sizeSchema = new mongoose.Schema({
    categoryId:{
        type:String,

    },
    size:{
        type:String,
        enum:["M","S","L","XL"]
    }
})