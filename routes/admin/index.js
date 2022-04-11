const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin")

const { requestValidator } = require("../../middleware")
const schema = require("./schema")
const token = require("../../helpers/jwt_helpers")

router.post("/addAdmin", requestValidator(schema.addAdmin),adminController.addAdmin )
router.put("/update/AdminProfile/:id", token.verifyAccessTokenAdmin,requestValidator(schema.update,"params"), adminController.updateAdmin),
router.get("/login", requestValidator(schema.Login), adminController.adminLogin )
router.delete("/delete",token.verifyAccessTokenAdmin, adminController.deleteAdmin)
router.post("/addProduct1",token.verifyAccessTokenAdmin, adminController.addProduct)
router.delete("/deleteProduct",token.verifyAccessTokenAdmin,adminController.deleteProduct)
router.put("/UpdateProduct",token.verifyAccessTokenAdmin, adminController.updateProduct)
router.get("/getAllProduct", adminController.getProduct)

//admin adding merchant
router.post("/addmerchant", token.verifyAccessTokenAdmin,requestValidator(schema.addMerchant), adminController.addMerchant)
router.get("/merchant/merchantprofile/" ,token.verifyAccessTokenAdmin,requestValidator(schema.getId,"query"),adminController.merchantProfile )

module.exports = router