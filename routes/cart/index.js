const express = require("express")
const cardController =require("../../controllers/cart")
const {requestValidator} =  require("../../middleware")
const schema = require("./schema")
const router = express.Router()


// router.post("/addProductInCart", requestValidator(schema.addIncart),cardController.addProductInCart)
router.post("/createcart" ,cardController.createCart )
router.post("/addProductToCart", cardController.addToCart)
router.get("/getCartByCustomerId", cardController.getUserCart)
router.delete("/deleteFromCart", cardController.deleteFromCart)
// router.delete("/s", cardController.delte)
module.exports = router


