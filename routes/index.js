// const { Router } = require('express');
// const router = Router();
// // const{ verifyAccessToken } = require('../helpers/jwt_helper');

// const merchantRoute = require('./merchant');

// router.use('/merchant', merchantRoute);

// // router.use(verifyAccessToken);


// module.exports = router;

// // const merchantLogin = async(req,res, next) =>{
// //     let {email, password} = req.body
// //     console.log(req.body)
// //     try{
// //         const user =  await Merchant.findOne({"email" :{$regex: new RegExp(email, "i")}});
// //     console.log(user)
// //         if(!user){
// //         return res.send(errors.emailNotExist)
// //     }
// //     const ismatch = await user.isValidPassword(password)
// //     // const ismatch = await 
// //     console.log("dssa",ismatch)
// //     if(!ismatch){
// //         return res.send(errors.wrongPasswordError)
// //     }
// //     const accessToken = await signAccessToken(user.id)
// //     console.log(accessToken)

// //     }catch(error){
// //         return next(error)
// //     }
// // }
// // const merchantLogin = async(req,res, next) =>{

// // let result =await Merchant.find({email:req.body.email},{});

// // //console.log(result)
// //  var match =await bcryptjs.compare(req.body.password,result.password)
// // console.log("hlsd",result.Password)
// //  //console.log(match)
// //  if(match){
// //      var privateKey = process.env.PrivateKey;
// //      let params = {
// //          email:req.body.email,password:req.body.password
// //      }
// //      var token = await jwt.sign(params,privateKey,{expiresIn:'1d'});
// //      console.log(token);
 
// //  res.status(HttpStatus.OK).json({token:token, status:200, success:true});
// //   }
// // }
// // const merchantLogin = async(req,res, next) =>{

// // let result =await Merchant.find({email:req.body.email},{});

// // //console.log(result)
// //  var match =await bcryptjs.compare(req.body.password,result.password)
// // console.log("hlsd",result.Password)
// //  //console.log(match)
// //  if(match){
// //      var privateKey = process.env.PrivateKey;
// //      let params = {
// //          email:req.body.email,password:req.body.password
// //      }
// //      var token = await jwt.sign(params,privateKey,{expiresIn:'1d'});
// //      console.log(token);
 
// //  res.status(HttpStatus.OK).json({token:token, status:200, success:true});
// //   }
// // }

// // for pagination
// // let limit = 0 ; let skip = 0
// // if(req.query.limit!=null || req.query.limit!=0){
// //     limit= req.query.limit
// // }
// // if(req.query.skip!=0 || req.query.skip != 0){
// //     skip = req.query.skip
// // }
// // const updateProduct = async (req, resp) => {
// //     //  console.log(req.query)
// //        var flag = await merchantmodel.findOne({email:req.query.email })
// //       if (flag.length!=0||flag!=null) {
// //     var {shortDescription,longDescription,unit,baseCost,discount,size,isActive } = req.body
// //    var result = await productmodel.updateOne({merchantEmail:req.query.email,brand:req.query.brand,model:req.query.model }, {
// //             $set: {
// //                shortDescription,longDescription,unit,baseCost,discount,size,isActive
// //             }
// //          }).catch((err) => resp.status(403).json({status})
// //         }   
   
   
   
   
// //    const deleteProduct = async (req, resp) => {
// //       var flag = await productmodel.findOne({merchantEmail:req.params.id})
// //       if (flag.length!=0||flag!=null) {
// //       await productmodel.updateOne({isActive:false})
// //    .then(()=>resp.status(200).json({status:"SUCCESS",MESSAGE:"PRODUCT_DELETED"}))
// //    .catch((err)=>resp.status(403).json({status:"FAILED",ERRORS:err}))
// //       } else
// //       resp.status(403).json({status:"FAILED",Error:"MERCHANT_ID_NOT_FOUND"})
// //    }

// const deleteProduct = async (req, resp) => {
//     var getproductmerchant= await productmodel.findOne({_id:req.query.id},{merchantEmail:1})
//     if (getproductmerchant.merchantEmail==req.query.email) {
//     await productmodel.updateOne({_id:req.query.id},{isActive:false})
//     .then(() => resp.status(201).json(
//        {status:"true",
//        respone:null,
//        code:"201",
//        errors:{
//        },
//        message:"product_deleted_succesfully"
//      }))
//      .catch((err) => resp.status(201).json({status:"false",
//      respone:"null",
//      code:"403",
//      errors:{
//          error_code:"failed_to_delete_product",
//          error_msg:"something_went_wrong"
//      },
//      message:"Unable to delete product"
//      }));
//     }else{
//        resp.status(201).json({status:"false",
//        respone:"null",
//        code:"403",
//        errors:{
//            error_code:"failed_to_delete_product",
//            error_msg:"unauthorized_merchant"
//        },
//        message:"failed_to_delete_product"
//        });
//     }
//  }

// const getProductAll = async (req, resp) => {
//     var limit = 0,skip = 0;
//     if (req.query.limit!=null||req.query.limit!=0)
//     {limit=req.query.limit }
//     if (req.query.skip!=null||req.query.skip!=0)
//     {skip=req.query.skip}
//     var data = await productmodel.find({isActive:true},{}).limit(limit).skip(skip)
//     console.log(data)
//     if(data!=null||data.length!=0){
//     resp.status(201).json(
//        {status:"true",
//        respone:data,
//        code:"201",
//        errors:{
//        },
//        message:"Products_Fetch_Successfull"
//      })
//   }else{
//     resp.status(201).json({status:"false",
//         respone:"null",
//         code:"403",
//         errors:{
//             error_code:"failed_to_fetch_product",
//             error_msg:"something went wrong"
//         },
//         message:"Unable_to_fetch_products"
//         })
//   }
//  }
// const usePopulate = async(req,res, next) =>{
//     await productModel.virtual('user', {
//         ref: 'merchants',
//         localField: 'merchant_id', // Of post collection
//         foreignField: '_id',    // Of user collection
//         justOne: true
//     })

//     const {id} = req.body
//     await productModel.find().populate("id")
//     .then((result) =>{console.log("result", result)})
//     .catch((error) =>{console.log("error", error)})
// }


 // const {phoneNumber } = req.body
    // const findNumber = await customer.findOne({phoneNumber: phoneNumber})
    // const accessToken = await signAccessToken(merchant.id)
    // console.log(accessToken)


    
//     let {otp} = req.body
//     let email = req.body.email
//     let findNumber
//     // var params
//     findNumber = await customerModel.findOne({email:email})
//     if(email != 0 || email !=null){
//         if(otp == 9999){
//           let  private_key ="sggfiqgljhfjahdjakshdjkashdjkahsdkjah";
//           let  params  = {email, otp}

//         const token = await jwt.sign(params,private_key,{expiresIn:"1d"})
//         // res.send({token:token})
//         res.send({status:200, response:{token:token}})

//         }
//     }else{
//         res.send({error:500, message: "this is number is not found"})
//     }
    
    
// }