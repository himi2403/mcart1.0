const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const bcryptjs = require("bcryptjs");

const MerchantSchema =  mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    dateOfBirth:{
        type:String,
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
    },
    password:{
        type:String,
    },
   countryCode:{
       type:String,
   },
   category:{
       type:String
   },
   brandName:{
       type:String
   },
   isActive:{
       type:Boolean,
       default:false
   },
  
//    Address:[{
//        type:mongoose.Schema.Types.ObjectId,
//        ref:"address",
//    }],
address: 
    {
        // "primary" : {
        //     type: Boolean
        // },
        "houseNo":{
            type: String
        },
        "streetaddress" : {
            type: String
        },
        "locality" : {
            type: String
        },
        "region" : {
            type: String
        },
        "country" : {
            type: String
        },
    }

},

{
    versionKey: false,
    timestamps: true
});

// MerchantSchema.pre('save', async function (next) {
//     try {
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(this.password, salt)
//         this.password = hashedPassword
//         next()

//     } catch (error) {
//         next(error)
//     }

// })
// MerchantSchema.methods.isValidPassword = async function (password) {
//     try {
//         return await bcrypt.compare(password, this.password)
//     } catch (error) {
//         throw error
//     }
// }

const Merchant = mongoose.model('merchants', MerchantSchema)
module.exports = Merchant;