const HttpStatus = require('http-status');
const errors = require('../errors');
const categorymodel = require("../models/category")

const addCategory = async(req,res,next) =>{
    let Category
    
        let {categoryName} = req.body
    try{
        let categoryAllready = await categorymodel.findOne({"categoryName": {$regex:new RegExp(categoryName,"i")}})
        if(categoryAllready){
            return res.send(errors.allreadyExist)
        }
        let Categoryadd = new categorymodel(req.body)
        Category = await Categoryadd.save()
    }
    catch(error) {
        return next(error)
        //clkasdfjhsda
    }
    res.status(HttpStatus.OK).json({message: "categoryAdd Successfully", data:Category, status:200, success:true})
}
// const getProduct = async(req,res,next) =>{
//     const
// }
module.exports={addCategory}