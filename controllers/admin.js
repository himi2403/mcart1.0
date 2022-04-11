const adminModel = require("../models/admin")
const Merchant = require("../models/merchant")
const productModel = require("../models/productschema")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {signAccessTokenAdmin} = require("../helpers/jwt_helpers")
const merchantModel = require("../models/merchant")
const httpStatus = require("http-status")
require("dotenv").config()


const addAdmin = async(req,res,next) =>{
    let findEmail 
    let {email} = req.body
    let saveNewAdmin
    try{

        findEmail = await adminModel.findOne({ "email": { $regex: new RegExp(email, "i") } })
        if(findEmail){
        return res.status(403).json({status:false, response: null, message:"email is allready exist" })
        }

            var salt = await bcryptjs.genSalt(10)
            var NewPassword= await bcryptjs.hash(req.body.password,salt)
            const newAdmin = new adminModel({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:NewPassword,
                role:req.body.role
            })
         await newAdmin.save()
          .then((result) => {
              res.status(200).json({response:result})
          })
    }catch(error) {
        res.status(401).json({status:false , Response : error, error:error.message})
    }
}
const updateAdmin = async(req,res,next) =>{
    let findId
    let {id} = req.params
    try{
        findId = await adminModel.findOne({id:id}).exec()
        if(!findId){
            return res.status(403).json({status:true,response:null, message:"Please Next valide ID"})
        }else{
            let{ firstName, lastName, email, password,role} = req.body
           const result = await adminModel.updateOne({_id:id},{
                $set:{firstName, lastName, email, password,role}
            }).catch((error) =>{
                res.status(400).json({status:false,response:null})
            })
            res.status(200).json({status:true, response:result, message:"updated successfully"})
        }

    }catch(error){
        res.status(401).json({status:false, response:null, })
    }
}
const adminLogin = async(req,res,next) =>{
    let findEmail
    let match
    let {email ,password} = req.body
    try{
        findEmail = await adminModel.findOne({"email":{$regex: new RegExp(email,"i")}})
       if (!findEmail){
           return res.status(403).json({status:false, response:null, message:"This email is nor linked with us"})
       }else{
           match = bcryptjs.compare(password,findEmail.password)
           if(!match){
               return res.status(403).json({status:false, message:'password is not match'})
           }
        //    if(match){
        //        let privateKey = process.env.ACCESS_TOKEN_SECRET_Admin
        //        let params = {
        //            email:req.body.email,password:req.body.password
        //        }
        //        let token = await jwt.sign(params, privateKey,{expiresIn:'1d'})
        //        res.status(200).json({status:true, response:token,})
        //    }
        const accessToken = await signAccessTokenAdmin(findEmail.id);
        return res.send({
            accessToken, findEmail, success: true, status: 200
        });
       }
    }catch(error){
        return res.status(401).json({status:false, response:null, error:error.message})
    }
}
const deleteAdmin = async(req,res,next) =>{
    let admin
    let {id} = req.query
    try{
    admin = await adminModel.findByIdAndDelete({_id:id}).exec()
    if(!admin){
        return res.status(404).json({status:false, response:null,})
    }
    else{
        return res.status(200).json({status:true, response:admin, message:"deleted successfully"})
    }

    }catch(error) {
        return res.status(403).json({status:false, response:error, error:error.message})
    }
}
const addProduct = async (req, res, next) => {
    let product
    let { serialNo } = req.body
    try {
        const existingProduct = await productModel.findOne({ "serialNo": { $regex: new RegExp(serialNo, "i") } })
        console.log("existing",existingProduct)
        // if (existingProduct) {
        //     console.log("khskdhdlsahh")
        //     return res.status(403).json({status:false, response:null,message:"Serial Number is exist"})
        // }

        const addproduct = new productModel(req.body)
        // console.log("add",addproduct)
        // console.log("jajfdja",req.body)
        product = await addproduct.save()
        res.status(200).json({ product: product, status: 200, success: true })
    } catch (error) {
        return next(error)
    }
}
const deleteProduct = async(req,res) =>{
    let {id} = req.query
    let findProduct 
    try{
        console.log("lkdhflahflaldafdljashd")
        findProduct =  await productModel.findOne({_id:id}).exec()
        console.log(findProduct)
        if(findProduct){
            result =  await productModel.updateOne({_id:id},{$set:{isActive:false}})
           console.log("result",result)
            res.status(200).json({status:true, response:result, message:"this Product has been deleted"})
        }
        else{
            res.status(401).json({status:true, response:null, message:"from this Id Product is not find"})
                }
    }catch(error){
        return res.status(403).json({status:true, response:null,error:error,error:error.message})
    }

}
const updateProduct = async(req,res)=>{
    let findProduct
    let {id} = req.query
    try{
        findProduct = await productModel.find({_id:id}).exec()
        console.log("kndflas",id)
        let { short_Description, long_Description, unit, baseCost, discount, size, brandName, isActive, categoryName } = req.body
        if(findProduct !=null){
            const result = await productModel.updateOne({_id:id},{
                $set:{short_Description, long_Description, unit, baseCost, discount, size, brandName, isActive, categoryName}
            })
            return res.status(200).json({status:true, response:result,message:"updated successfully"})
        }else{
            return res.status(401).json({status:false, response:null, message:"Product Not found"})
        }
    }catch(error){
        res.status(403).json({status:false,response:null, error:error, error:error.message})
    }
}
const getProduct = async (req,res) =>{
    try{
        const get = await productModel.find({})
        return res.status(200).json({status:true, response:get})
    }catch(error){
        return res.status(403).json({status:false, response:error, error:error.message})
    }
}
const addMerchant = async function (req, res, next) {
    let merchant;
    // console.log(req.body)
    const { email } = req.body;//check email is exist
    try {
       
     existingMerchant = await Merchant.findOne({ "email": { $regex: new RegExp(email, "i") } });
        // console.log("bvmdhkdhkjdkj",NewPassword)
        if (existingMerchant) {
            return res.status(401).json({message:"this email is already exist",status:false, success:401});
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
        console.log("ghjgcjhgkhgahmerchant",merchant)
        return res.status(200).json({ result:merchant, status: 200, success: true });
    } catch (error) {
        // console.log(err);
        return  res.status(403).json({error:error.message, error:error})
    }
};
const merchantProfile = async(req,res, next) =>{
    let merchant
    let {id} = req.query
    try{
        merchant = await Merchant.findById(id)
        console.log("merchant", merchant)


    }catch(error){
        return res.status(403).json({status:false, response:error,error:error.message})
    }
    if(!merchant){
        return res.send("from this id merchant not exist")
    }
    return res.status(401).json({message: "profile found", data:merchant, status:200, success:true})
      } 
      

module.exports = {
    addAdmin,
    updateAdmin,
    adminLogin,
    deleteAdmin,
    addProduct,
    deleteProduct,
    updateProduct,
    getProduct,
    addMerchant,
    merchantProfile
}