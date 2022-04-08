const productModel = require("../models/productschema")
const customerModel = require("../models/customer")
const addressModel = require("../models/address")
const errors = require("../errors")
const HttpStatus = require("http-status")
const jwt_helpers = require("../helpers/jwt_helpers")
const jwt = require("jsonwebtoken")
const { result } = require("lodash")

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
    try{
        const customerAllreadyExist = await customerModel.findOne({ "email": { $regex: new RegExp(email, "i") } });
        if (customerAllreadyExist) {
            return res.send(errors.customerAllreadyExist);
    }
    var customer = new customerModel( {...req.body});
        saveDetail = await customer.save();
    }catch(error){
        return next({error: error, message:error.message, status:500, success: false})
    }
    res.status(HttpStatus.OK).json({result :saveDetail, status:200, success:true})
}
const findcustomerDeatil = async(req,res,next) =>{
    // let findDetail
    const {email} = req.body
    try{
        const detail  = await customerModel.find({"email": {$regex: new RegExp(email, "i")}}).populate("address")
        if(!detail){
            return res.send(errors.emailNotExist)
        }else{
            res.status(HttpStatus.OK).json({result:detail, success:200, status:true})
        }
    }catch(error){
        return res.send({err:error.message, status:false, })
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
let {email,otp} = req.body

    try{
        if(email != null || otp !=0){
            if(otp!=null){
                let findEmail = await customerModel.findOne({email:req.body.email})
                console.log(findEmail)
                if(findEmail!=null){
                    let  private_key ="sggfiqgljhfjahdjakshdjkashdjkahsdkjah";
                          let  params  = {email, otp}
                        const token = await jwt.sign(params,private_key,{expiresIn:"1d"})
                        res.send({token:token})
                }
                else{
                    res.send(errors.emailNotExist)  

            }
        }else{
            res.send({error: "invalid otp"})
        }}
    }catch(error){
        return res.send(error)
    }
}
const updateAddress = async (req,res,next) => {
    const {address_id}  = req.query
    let findAddress
    let findCustomer
   try{
       findAddress = await addressModel.findById({_id:Types.ObjectId(address_id)})
    //    console.log(findAddress)
      const customer_Id = findAddress.customer_Id
      console.log('customer_Id',customer_Id)
      const newAdress = (findAddress.houseNo+" "+findAddress.streetName+" "+findAddress.area+" "+findAddress.city+" "+findAddress.pincode).toString()
    //    console.log(newAdress)
     findCustomer = await customerModel.findByIdAndUpdate({_id:customer_Id}, {
           $set:{address:newAdress}
       },{new:true}
       )

   }catch(error){
       return res.send(error)
   }
    return res.send({result:findCustomer})
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
   }catch(error){
       return next({error:error})
   }
   if(!findProfile){
       res.send({message:"this Profile not exit", status:500, sucess: false})
   }
   res.status(HttpStatus.OK).json({result : findProfile, message:"profile found",  status:200, success: true})
}
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