const productModel = require("../models/productschema")
const customerModel = require("../models/customer")
const addressModel = require("../models/address")
const errors = require("../errors")
const HttpStatus = require("http-status")
const jwt_helpers = require("../helpers/jwt_helpers")
const jwt = require("jsonwebtoken")
const { result } = require("lodash")
const { signAccessTokencustomer } = require("../helpers/jwt_helpers")

const { Types } = require('mongoose');
// const errors = require("../errors/index")
// const customer = require("../models/customer")


const getAllProduct = async(req,res) =>{
let getAllProduct
    const {limit, skip} = req.query
    if(limit !=null){
        limit
    }
    if(skip !=null){
        skip
    }
    try{
         getAllProduct = await productModel.find({}).populate("merchant_id").limit(limit).skip(skip)
        //  console.log("getAllCustomer", getAllProduct)

         return res.status(HttpStatus.OK).json({result:getAllProduct, status:200, success: true})
        //  getAllProduct= await productModel.find().populate("merchant_id")
    }catch(error){
        return res.send({error: error.message})
    }

} 

const addCustomer = async(req,res,next) =>{
    let {email} = req.body
    let saveDetail
    let accessToken
    try{
        const customerAllreadyExist = await customerModel.findOne({ "email": { $regex: new RegExp(email, "i") } });
        if (customerAllreadyExist) {
            return res.send(errors.customerAllreadyExist);
    }
    var customer = new customerModel( {...req.body});
      let saveDetail1 = await customer.save();
        // saveDetail =String.toLowerCase(saveDetail1)
        // accessToken = await signAccessTokencustomer(saveDetail.id);
        // console.log("asss",accessToken);
    }catch(error){
        return next({error: error, message:error.message, status:500, success: false})
    }
    res.status(HttpStatus.OK).json({result :saveDetail, status:200, success:true, token:accessToken})
}
const findcustomerDeatil = async(req,res,next) =>{
    // let findDetail
    let {email} = req.query
    try{
        const detail  = await customerModel.find({"email": {$regex: new RegExp(email, "i")}}).populate("address")
        if(!detail){
            return res.send(errors.emailNotExist)
        }else{
            res.status(HttpStatus.OK).json({result:detail, success:200, status:true})
        }
    }catch(error){

        return res.send({err:error.message, status:false, success:false})
    }
}
const searchAndFilter = async(req,res,next) =>{
 try{
    const regex = new RegExp(req.query.name, "i")
    let found = await customerModel.find({$or:[
        {firstName:regex},
        {lastName:regex},   
        {email:regex}
    ]})
    res.send({found:found, success:200,status: true})
 }catch(error){
     return res.send({error:error.message, status:false, success:true})
 }
}

const loginWithPhoneNumber = async(req,res) =>{
let {email} = req.body
let otp = 4444
    // try{
        if(email && otp){
            if(otp!=null){
                let findEmail = await customerModel.findOne({email:req.body.email})
                console.log(findEmail)
                if(findEmail!=null){
                    let  private_key ="sggfiqgljhfjahdjakshdjkashdjkahsdkjah";
                          let  params  = {email, otp}
                        const token = await jwt.sign(params,private_key,{expiresIn:"1d"})
                        res.send({token:token})
                        // const accessToken = await signAccessTokencustomer(customer.id);

                }
                else{
                    res.send(errors.emailNotExist)  

            }
            }else{
                res.send({error: "invalid otp"})
            }
    }
                // }catch(error){
                //     return res.send(error)
                // }
}
const updateAddress = async (req,res,next) => {
    const {id}  = req.query
    let findAddress
    let findCustomer
   try{
       findAddress = await addressModel.findOne({_id:id})
       console.log("khdfhasf",findAddress)
       if(!findAddress){
           return res.status(401).json({response:null, sucess:false, message :"please Enter correct AddressId"})
       }
    //    console.log(findAddress)
      const customer_Id = findAddress.customer_Id
    //   console.log("hhdfjaf",)
      console.log('customer_Id',customer_Id)
    //   const newAdress = (findAddress.houseNo+" "+findAddress.streetName+" "+findAddress.area+" "+findAddress.city+" "+findAddress.pincode).toString()
    //    console.log(newAdress)
    const newAdress = req.body
    console.log("new", newAdress)
     findCustomer = await addressModel.updateOne({customer_Id:customer_Id}, {
           $set:req.body
       },{new:true})
       return res.send({result:findCustomer, status:200 , message: "this "})

   }catch(error){
       return res.send(error)
   }
}
   
const getAllCustomerAddress = async(req,res,next) =>{
    let findProfile
   try{
        // findProfile = await customerModel.findById(req.params.id)
        findProfile = await customerModel.aggregate([
            { 
                $match:{_id:Types.ObjectId(req.params.id)}
            },
            {
                $lookup:{
                    from:"addresses",
                    localField:"_id",
                    foreignField:"customer_Id",
                    as:"customer_Address"
                },
                
            },
            {
                $unwind:"$customer_Address"
                
            }
        ])
        console.log("kdfjasd",findProfile )
   }catch(error){
       return next({error:error})
   }
   if(!findProfile){
       res.send({message:"this Profile not exit", status:500, sucess: false})
   }
   res.status(HttpStatus.OK).json({result : findProfile, message:"profile found",  status:200, success: true})
}
// const insertAddressIncustomer = async(req,res,next) =>
// {
//     try{
//         const address = await address.
//     }
// }
module.exports = {
    getAllProduct,
    addCustomer,
    findcustomerDeatil,
    searchAndFilter,
    loginWithPhoneNumber,
    getAllCustomerAddress,
    updateAddress,
    // addNewAddress
}