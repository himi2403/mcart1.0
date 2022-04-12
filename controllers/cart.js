
var customermodel = require("../models/customer")
var cartmodel = require("../models/cart");
var productmodel = require("../models/productschema");
const { ObjectId } = require("bson");
const number = require("joi/lib/types/number");




const createCart = async (req, res) => {
  console.log("kkk")
let { id } = req.query
  var customer = await customermodel.findOne({ _id:id }, { _id: 1 })
  // console.log("id",req.query.id)
  if (customer != null) {

    const newCart = new cartmodel({
      customerId: id
    })
    newCart.save()
    .then(async (result) => {
      console.log("djggfaksdgfas")
      await customermodel.updateOne(
        { _id: id },
        { $set: { cart: result._id } }
      ).then(() => {
        res.status(201).json({status: true,respone: result, code: 201,message: "cart_created_succesfully"})})
}).catch((error) => {res.status(201).json({status: false,respone: null,code: 403,
        errors: {error_code: "failed_to_add_cart", error_msg: error.message}, message: "Unable to add cart"})})
  }
  else {res.status(201).json({status: false,respone: null,code: 403,
      errors: {error_code: "failed_to_add_cart",error_msg: "invalid_customer_id"},
      message: "Unable to add cart"})
  }
} 

//addtocart

const addToCart = async (req, res) => {
  console.log("add")
  let {productId} = req.body
let  checkUnit = await productmodel.findOne({_id:req.body.productId},{unit:1})
console.log("checkUnit", checkUnit)
if(checkUnit.unit>=req.body.quantity){
  console.log("quantity", req.body.quantity)
  if (req.body.quantity == undefined || req.body.quantity == null) { quantity = 1 }


  var customer = await customermodel.findOne({ _id: req.query.id })
  console.log("------------",customer);
  var cost = await productmodel.findOne({ _id: req.body.productId },{discount_cost :1 })

  console.log("777777777777",cost);
  if (customer != null || !cost) {

    var cartid = await customermodel.findOne({ _id : req.query.id }, { cart: 1 })
    console.log("44444444444444444",cartid);

    var price = await cartmodel.findOne({ _id: cartid.cart })
 console.log("p", price)

    var discount_cost = await productmodel.findOne({ _id: req.body.productId }, { discount_cost: 1 })


    var totalcost = Number(price.price) + Number(discount_cost.discount_cost * req.body.quantity)
    console.log("hfa",price.price,discount_cost.discount_cost ,req.body.quantity)

    await cartmodel.updateOne({ _id: cartid.cart }, { $set: { price: totalcost } })

    var flag=0
    await cartmodel.findOne({_id:ObjectId(cartid.cart)},{})
    
      .then(async(data)=>{

      var product=data.products
      product.forEach(function(products) {
      
       if(products.productId==req.body.productId)
       {
         flag=1
         products.quantity=(products.quantity)+Number(req.body.quantity);
        //  console.log("d", products.quantity)
       }
       }
      )
      if(flag==1){
      // console.log(flag)
         data.save().then((result)=>{
 res.status(201).json({status: true,respone: result,code: 201,
              message: "product_added_to_cart_succesfully"
            })})}
    if(flag==0){
     // console.log(flag)
        await cartmodel.findByIdAndUpdate(cartid.cart,
      {
        $push:
        {
          products: {
            productId: req.body.productId,quantity:req.body.quantity
          }
        }
      },{new:true}
    ).then((data2) => {
       res.status(201).json({status: true,respone: data2,code: 201,
       message: "product_added_to_cart_succesfully"
     })}
   ).catch((error) => {
      res.status(201).json({status: false,respone:null,code: 403,
        errors: { error_code: "failed_to_add_to_cart",error_msg: error.message },
        message: "Unable to add to cart"
      })})
}
   
}).catch((error) => {res.status(201).json({status: false,respone: null,code: 403,
errors: {
      error_code: "failed to add to cart",
      error_msg: error.message
    },
    message: "Unable to add to cart"
  })})
} else {res.status(201).json({status: false,respone: null,code: 403,
      errors: {
        error_code: "failed to add to cart",
        error_msg: "invalid customer id or product id"
      },
      message: "Unable to add merchant"
    })
  }
}else{res.status(201).json({status: false,respone: null,code: 403,
  errors: {
    error_code: "failed to add to cart",
    error_msg: "stock unable"
  },
  message: "stock is not available"
})

}
};
//UPDATE
const updateCart = async (req, res) => {
  console.log("update")
  var quantity = req.body.quantity;
  if (req.body.quantity == undefined || req.body.quantity == null) { quantity = 1 }

  var checkcart= await cartmodel.findOne({ _id: req.query.id},{})

  if (checkcart!=null){

  var cost = await productmodel.findOne({ _id: req.body.productId }, { cost: 1 })

  if (cost != 0) {

    /*  var price = await cartmodel.findOne({ _id: req.query.id }, {}) */
    var cost = await productmodel.findOne({ _id: req.body.productId }, { cost: 1 })
    await cartmodel.findOne({_id:req.query.id}).then(async(data)=>{
       var product=data.products

       product.forEach(function(products) {
       
        if(products.productId==req.body.productId)
        {
          data.price=data.price-(cost.cost*products.quantity)
        data.price =data.price+(cost.cost*req.body.quantity)
          
          products.quantity=quantity;
      }
        //res.json(products.productId);
    });
    data.save().then(()=>{

    res.status(201).json(  { status: true,respone: data,code: 201,message: "product added to cart succesfully"})})})
   .catch((error) => {res.status(201).json({status: false,respone: null,code: 403,
      errors: {
        error_code: "failed to add to cart",
        error_msg: error.message
      },
      message: "Unable to add to cart"
    })
  }
  )

   
    }else{
      res.status(201).json({status: false,respone: null,code: 403,
        errors: {error_code: "failed to add to cart",error_msg: "invalid product id"},
        message: "Unable to add to cart"
      })
    }
    }else{
      res.status(201).json({status: false,respone: null,code: 403,
        errors: {
          error_code: "failed_to_add_to_cart",
          error_msg: "invalid_cart_id"
        },
        message: "Unable to add to cart"
      })
    }
  }
  

//DELETE
const deleteFromCart = async (req, res) => {
  console.log("de")
  //check product is it 
  var checkproduct = await productmodel.findOne({ _id: req.body.productId }, {})
  let checkcart =await cartmodel.findOne({_id:req.query.id})

  if (checkproduct != null|| checkcart !=null) {

    var cost = await productmodel.findOne({ _id: req.body.productId }, { cost: 1 })



    await cartmodel.findOne({_id:req.query.id}).then((data)=>{
      var product=  data.products
      console.log("data", data)
  
      product.forEach(function(products) {
      
       if(products.productId==req.body.productId)
       {
         data.price=data.price-(cost.cost*products.quantity)
         
     }
   })
   data.save()
  }
    )


  await cartmodel.updateOne(
    { _id: ObjectId(req.query.id) }, 
    { $pull: { products: { productId: ObjectId(req.body.productId) } } }
)
.then(async(result)=>{

 res.status(201).json({
    status: "true",
    respone: result,
     code: "201",
    errors: {
     },
     message: "product_deleted_from_cart_succesfully"
   }
   )
 }
)
.catch((error) => {
  res.status(201).json({status: false,respone: null,code: 403,
    errors: {error_code: "failed_to_delete_from_cart",  error_msg: error.message },
    message: "Unable to delete from cart"
  })})}

else {
    res.status(201).json({status: false,respone: null,code: 403,
      errors: {error_code: "failed_to_delete from_cart",error_msg: "invalid_product_id"},
      message: "Unable to delete from cart"
    })
  }

}

//GET USER CART

const getUserCart = async (req, res) => {
  console.log("getUser")
  var cardId = await customermodel.findOne({_id:req.query.id})
  console.log("cardId",cardId)
if(cardId)
{
  cartdetails = await cartmodel.findOne({_id:cardId.cart},{_id:0,products:1,price:1})
console.log("cartdetails",cartdetails)

res.status(201).json({status: true,respone: cartdetails,code: 201,message: "cart details fetched succesfully"})}
if(cardId!=null&&cardId.cart==null){
res.status(201).json({status: false,respone: null,code: 403,
  errors: {error_code: "failed_to_get_customer_cart", error_msg: "cart not created for this customer"},
  message: "Unable to fetch cart"
})

}

if(cardId==null){
  res.status(201).json({status: false,respone: null,code: 403,
    errors: {error_code: "failed_to_get_customer_cart",error_msg: "invalid_customer_id"},
    message: "Unable to fetch cart"
  })}}


module.exports = {
  createCart, addToCart, updateCart, deleteFromCart, getUserCart,
}

