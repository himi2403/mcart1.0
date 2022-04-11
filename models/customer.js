const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const bcryptjs = require("bcryptjs");
const boolean = require("joi/lib/types/boolean");

const customerSchema =  mongoose.Schema({
    firstName:{
        type:String,
        minLength:[3,"Enter minimum 2 words"],
        maxLength:[30,"Enter the maximum 30"],
        match:[/^[a-z .'-]+$/i,"Enter valid first name"]
    },
    lastName:{
        type:String,
        minLength:[3,"Enter minimum 2 words"],
        maxLength:[30,"Enter the maximum 30"],
        // match:[/^[a-z .'-]+$/i,"Enter valid lastname name"]
    },
    dob:{
        type:Date,
        max:Date.now - 365*24*60*60*1000
    },
    gender:{
        type:String,
        value:{enum:["Male","male", "Female", "female", "other","Other"]}, 
        message:["(value) is not support"],
        
    },
    phoneNumber:{
        type:Number,
        validate(value){
            if(! value ||value.toString().length != 10 || value <0)
            throw new Error("Enter a valid Number")
        }
    },
    email:{
        type:String,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        // unique:true
    },
    password:{
        type:String,
    },
   countryCode:{
       type:String,

   },
   isActive:{
       type:Boolean
   },
  
   address:{
       type:mongoose.Types.ObjectId,
       ref: "address",

   },
   cart:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"cart"
}

},


{
    versionKey: false,
    timestamps: true
}


);

customerSchema.pre('save', async function (next) {
    try {
        if(this.password){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
        }
    } catch (error) {
        next(error)
    }

})
// MerchantSchema.pre("save", async function(next) 
// {
//     try{
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hashSync(this.password,salt)
//         this.password = hashedPassword
//         next()
//     }catch(error){
//         next(error)
//     }
// })
customerSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

const customer = mongoose.model('customer', customerSchema)
module.exports = customer