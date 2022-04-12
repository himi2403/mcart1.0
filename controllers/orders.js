const HttpStatus = require("http-status")
const orderModel = require("../models/orders")
const cartModel = require("../models/cart")
const productModel = require("../models/productschema")
const customerModel = require("../models/customer")


const { Types } = require('mongoose');
const customer = require("../models/customer")

const postorder = async(req,res,next) =>{
    let neworder
    const {id} = req.query
    const priceProduct = await cartModel.findOne({_id:id})
    console.log("priceProduct", priceProduct)
    //   const productPrice =  JSON.parse(JSON.stringify(priceProduct)).price;
    const productPrice = JSON.parse(JSON.stringify(priceProduct)).price
      console.log("productPrice", productPrice)
   try{
       const orderPlaced = new orderModel({
        product_id:req.body.product_id,
        customer_id:req.body.customer_id,
        address:req.body.address,
        quantity :req.body.quantity,
        price:productPrice,
        status   :req.body.status,
        isActive:req.body.isActive,
       })
     console.log("customer",customer)
    //    const checkCustomer =  await customerModel.find({})
    //    console.log("check",checkCustomer);
    //    if(!checkCustomer){
    //        return res.status(500).json({message:"Please Login with this email", status:true})
    //    }else{
    // const order = new orderModel(req.body )
     let result = await orderPlaced.save()
  
    //  res.status(HttpStatus.OK).json({status:true, response:result, })
    //    }

   return res.status(HttpStatus.OK).json({status:200, sucess: true,response:result})
}
   catch(error){
    return res.status(201).json({status:false,Respone:null,status:403,errors:{error_code:"Order Did Not get posted ", error_msg:error.message }})
   }
}

const updateOrderStatus = async(req,res,next) =>{
    let {id} = req.params
    let {status} = req.body
    let getupdate

    try{
         getupdate = await orderModel.findByIdAndUpdate({_id:id},{$set:
            {status:status}},
            {new:true}
        )
    }catch(error){
        return res.status(201).json({status:false,Respone:null,status:403,errors:{error_code:"order update failed", error_msg:error }})
    }
    return res.status(HttpStatus.OK).json({result:getupdate, status:200,success: true})
}
const cancelOrder = async (req,res,next) =>{
    let deleteOrder
    const {id} = req.query
    console.log("order_id",id)
    // console.log("if", id)
    try{
        deleteOrder = await orderModel.findById({_id:id}).limit(1)    
        const id  = deleteOrder.address
        console.log("id", deleteOrder)
        // if(deleteOrder == null){
        //     return res.send({message:"order is not found"})
        // }else{
        //     const orderCanceled = await orderModel.deleteOne({deleteOrder})
        // }

    }catch(error){
        return res.status(201).json({status:false,Respone:null,status:403,errors:{error_code:"order cancel failed", error_msg:error.message }})
    }
    return res.status(200).json({status:true, Response: deleteOrder, message:"this order canceled success full delete"})
}

const getOrderdetail = async (req,res, next) =>{
    let orderDetail
    try{
        let {id} = req.params
        // orderDetail = await orderModel.aggregate([
        //     {
        //         $match: {product_id: Types.ObjectId(req.query.id)}
        //     },
        //     {
        //         $lookup:{
        //             from:"products",
        //             localField:"product_id",
        //             foreignField:"_id",
        //             as:"Order_Detail"
        //         },   
        //     },
        // ])

        orderDetail = await orderModel.findById({_id:req.params.id})// .populate("product_id").exec()
        .populate([{path:"product_id", select:""},
                  {path:"customer_id", select:""}
    
    ]).exec()
        console.log("orderDetail",orderDetail)

    } catch(error){
    return res.status(201).json({status:true, Response: null, message:"request fail " , error: error.message})
    }
    return res.status(201).json({status:true, Response:orderDetail, message: "order detail of the customer"})
}

const orderHistory = async(req,res,next) =>{
    let orderDetail 
    try{
        const {customerid } = req.query
        orderDetail = await orderModel.find({customer_id:customerid}).populate([{pa}])
        .then((result) =>{
            res.status(200).json({status: true, response:result , message: "order history"})
        }).catch((error) =>{
            res.status(404).json({status:false,response:null,})
        })
    }catch(error){
        res.status(500).json({status:false, response:null, error:error.message})
    }
}

// const orderAccecpt =async(res,req,next) =>{

// }
const cancelSingle = async (req,res,next) =>{
    cosnt
}
module.exports={
    postorder,
    updateOrderStatus,
    cancelOrder,
    getOrderdetail,
    orderHistory,

}