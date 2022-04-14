const HttpStatus = require("http-status")
const errors = require("../errors")
const addressmodel = require("../models/address")

const UserAddress = async(req,res,next) =>{
    let saveAddress
   try{
       console.log(req.body)
       console.log("klhjlsdkjjds")
    const address = new addressmodel(req.body)
     saveAddress = await address.save()

   }catch(error){
    return res.status(201).json({status:"false",Respone:"null",code:"403",errors:{error_code:"failed_to_add_address", error_msg:error }})
   }
   res.status(HttpStatus.OK).json({result :saveAddress, status:200, success:true})
}



const deleteAddress = async(req,res,next) =>{
    let deleteAddress 
    const{id} = req.query
    try{
        deleteAddress = await addressmodel.findByIdAndDelete({_id:id});
    //    if (!deleteAddress) {
    //        return res.send(errors.thisIdNotexist)
    //     }    
    }catch(error){
        return res.status(201).json({status:false,Respone:null,code:403,errors:{error_code:"failed_to_add_address", error_msg:error }})
    }
    return res.send({response: deleteAddress, message: "this address deleted", success: 200, status: true})
}
const updateAddress = async(req,res) =>{
let getAddress 
const {id} = req.query

try{
    // let {houseNo,streetName,area,city,pincode} = req.body
    getAddress = await addressmodel.findByIdAndUpdate({_id: id},{
        $set:req.body
    })
    // if(!get)
    
} catch(error){
    return res.status(201).json({status:false,Respone:null,status:403,errors:{error_code:"failed_to_add_address", error_msg:error }})

}
return res.status(HttpStatus.OK).json({status: true, Response: getAddress, staus:500, message: "this data  updated successfully "})
}
module.exports = {
    UserAddress,
    deleteAddress,
    updateAddress
}