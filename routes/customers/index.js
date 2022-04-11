const customerRouter = require("../../controllers/customer")
const express = require("express")
const router = express.Router()
const { requestValidator } = require('../../middleware');
const schema = require('./schema');
const token = require("../../helpers/jwt_helpers")

router.post("/customer/add",requestValidator(schema.addAddress) ,customerRouter.addCustomer)
router.get("/customer/getProfile/:id",  token.verifyAccessTokencustommer,customerRouter.getAllCustomerAddress)
router.get("/customer/getdetail", customerRouter.findcustomerDeatil)
router.get("/customer/find", customerRouter.searchAndFilter)
router.get("/product/customer",  customerRouter.getAllProduct)
router.post("/customer/login", customerRouter.loginWithPhoneNumber)
router.put("/customer/Address", token.verifyAccessToken,customerRouter.updateAddress)

module.exports = router