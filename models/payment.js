const mongoose = require('mongoose');
const cardSchema= mongoose.Schema({
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"order"
        },
        card_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"card"
        },

    cardnumber:{
        type:Number,
        required:true,
        validate(value)
        {if(value.toString().length!=16||value<0)
            {
        throw new Error("Enter a valid card number")}}
    },
    cardname:{
        type:String,
        // required:true
    },
    cardholdername:{
        type:String,
        // required:true
    },
    CVV:{
        type:Number,
        required:true,
        validate(value){
            if(value.toString().length!=3||value<0)
            {
        throw new Error("Enter a valid CVV number")}
    }
},
    expdate:{
        type:Date,
        // required:true,
        min:'2020-01-01',
        max:'2032-12-31'
    },
    randomKey:String
});

module.exports= mongoose.model("payment",cardSchema);