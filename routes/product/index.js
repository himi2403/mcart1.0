const express = require('express');
const router = express.Router();
const { requestValidator } = require('../../middleware');
const schema = require("./schema")
const productRouter = require("../../controllers/product")
const categoryRouter = require("../../controllers/category")
const token = require("../../helpers/jwt_helpers")

router.get("/merchant/searchProduct", productRouter.searchByProduct)
router.put("/merchant/updateProduct/:id",token.verifyAccessToken, productRouter.updateProduct )
router.delete("/merchant/product/delete/:id", token.verifyAccessToken,productRouter.deleteProduct )
router.post("/merchant/product/addProduct", token.verifyAccessToken,requestValidator(schema.addProduct),productRouter.addProduct)
router.get("/merchant/inventory/",productRouter.productgetbymerchantid)
router.post("/addcategory", categoryRouter.addCategory)
//router.put("merchant/updateProduct/:id",token.verifyAccessToken, productRouter.updateProduct )

router.get("/product/allProduct", productRouter.allProduct)
router.get("/product/productSort",productRouter.productSort )
router.get("/product/categoryName/" ,productRouter.filterByCategoriesName)
router.get("/product/filterbrand/", productRouter.filterByBrand)


// router.get("/pop", productRouter.populate)
router.get("/p", productRouter.populate)

module.exports = router