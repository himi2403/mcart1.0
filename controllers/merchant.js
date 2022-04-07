const errors = require('../errors');
const Merchant = require('../models/merchant')
const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status');
const bcryptjs = require("bcryptjs")
const { signAccessToken } = require('../helpers/jwt_helpers')

const addMerchant = async function (req, res, next) {
    let merchant;
    // console.log(req.body)
    const { email } = req.body;//check email is exist
    try {
       
     existingMerchant = await Merchant.findOne({ "email": { $regex: new RegExp(email, "i") } });
        // console.log("bvmdhkdhkjdkj",NewPassword)
        if (existingMerchant) {
            return res.send(errors.merchantExistsError);
    }
    var salt = await bcryptjs.genSalt(10)
    var NewPassword= await bcryptjs.hash(req.body.password,salt)
        const newMerchant = new Merchant({
            firstName: req.body.firstName, 
            lastName:req.body.lastName,
            dateOfBirth:req.body.dateOfBirth,
            email:req.body.email,
            password:NewPassword,
            phoneNumber:req.body.phoneNumber,
            category:req.body.category,
            brandName:req.body.brandName,
            countryCode:req.body.countryCode,
            isActive:req.body.isActive,
            category:req.body.category,
            brandName:req.body.brandName,
            address:{
                houseNo:req.body.address.houseNo,
                streetaddress:req.body.streetaddress,
                locality :req.body.address.locality,
                region :req.body.address.region,
                country:req.body.address.country
            }
        });
           
         let merchant = await newMerchant.save();
        //  const accessToken = await signAccessToken(merchant.id)
        // console.log(accessToken)
        return res.status(HttpStatus.OK).json({ reault:merchant, status: 200, success: true });
    } catch (err) {
        console.log(err);
        return next(err.message);
    }
};


const getMerchant = async(req,res,next) =>{
    let merchantget;
    try{
         merchantget = await Merchant.find().sort({_id: -1}).select("-_v").exec()
         console.log("merchant", merchantget)

    }catch(error){
        return next(err)
    }
    return res.status(HttpStatus.OK).json({data: merchantget, status:200, success: true})
}

// const merchantLogin = async(req,res, next) =>{
//     let {email, password} = req.body
//     // console.log(req.body)
//     try{
//         const user =  await Merchant.findOne({"email" :{$regex: new RegExp(email, "i")}});
//     // console.log(user)
//         if(!user){
//         return res.send(errors.emailNotExist)
//     }
//     const ismatch = await Merchant.isValidPassword(password)
//     // const ismatch = await 
//     // console.log("dssa",ismatch)
//     if(!ismatch){
//         return res.send(errors.wrongPasswordError)
//     }
//     else{
//         const accessToken = await signAccessToken(user.id)
//     // console.log(accessToken)
//     res.send({"token":accessToken})
//     }
//     }catch(error){
//         return next(error)
//     }
//     return res.status(HttpStatus.OK).json({message:"login successfully" , status:200, success: true})
// }

//delete merchant 
const deleteMerchant = async(req,res, next) =>{
    let merchantDelete
    let merchantExist
    const {id} = req.params
   try{ 
       merchantDelete = await Merchant.findByIdAndUpdate({_id:id},{$set:{isActive:false}})
       .then((result) => {res.send(result)} )
       .catch((error) =>{
           res.send({error: error.message, status:500, })
       })
       if(!merchantDelete){
           console.log()
           return res.send(errors.merchantIdnotFound)
       }
   }catch(error){
       return next(error)
   }
   return res.status(HttpStatus.OK).json({data: "deleted merchant sucessfully", status:200, success: true})
}


const merchantupdate  = async(req,res,next) =>{
       const id = req.params.id
    //    console.log(id)
       let result
    const {firstName,lastName,dateOfBirth,phoneNumber,category,brandName} = req.body
    console.log(req.body.password)
    //  var salt = await bcryptjs.genSalt(10)
    //  let newPassword = await bcryptjs.hashSync(req.body.password,salt)
     result = await Merchant.updateOne({_id:id},
        {
            $set:{firstName,lastNane,dateOfBirth,phoneNumber,category,brandName}
        })
        // res.send(result)
        .then((result) =>{
            res.send({"result": result})
        })
        .catch((error) =>{
            res.send("error", error)
            console.log('error',error)
        })

   }
 const merchantProfile = async(req,res, next) =>{
     let merchant
     try{
         merchant = await Merchant.findById(req.params.id).exec()//


     }catch(error){
         return next(error)
     }
     if(!merchant){
         return res.send(errors.merchantDoesNotExist)
     }
     return res.status(HttpStatus.OK).json({message: "profile found", data:merchant, status:200, success:true})
       } 
       
const productgetbymerchantid = async(req,res,next) =>{
        let limit = 0 ; let skip = 0
        // if(req.query.limit!=null || req.query.limit!=0){
        //     limit= req.query.limit
        // }
        // if(req.query.skip!=0 || req.query.skip != 0){
        //     skip = req.query.
        // }
     try {  
         const {id} = req.params
        const data = await Merchant.find({_id:id})
        if(!data){
            return res.send("form this id no data found")
        }
        else{
            return res.status(HttpStatus.OK).json({result:data,status:200, success:true})
        }
    }catch(err){
        return next(error)
    }
    }
const merchantLogin =  async (req, res) => {
      try{
        const {email,password} = req.body
        console.log(email,password)
          let result =await Merchant.findOne({email:email});
          console.log("result",result)
           let match =await bcryptjs.compare(password,result.password)
           console.log("match",match)
           if(match){
               var privateKey = process.env.PrivateKey;
               let params = {
                   email:req.body.email,password:req.body.password
               }
               var token = await jwt.sign(params,privateKey,{expiresIn:'1d'});
               console.log(token);
           
           res.status(200).json({token:token});
            }
          }catch(error) {
              res.status(500).json({error: error, message:error.message})
      }
    }
module.exports = {
    addMerchant,
    getMerchant,
    merchantLogin,
    deleteMerchant,
    // addProduct,
    merchantupdate,
    merchantProfile,
    productgetbymerchantid
}