const customerRouter = require("../../controllers/customer")
const express = require("express")
const router = express.Router()
const { requestValidator } = require('../../middleware');
const schema = require('./schema');
const token = require("../../helpers/jwt_helpers")

router.post("/customer/add",requestValidator(schema.addAddress) ,customerRouter.addCustomer)
router.get("/customer/getProfile",requestValidator(schema.addresssupdate,"query"),customerRouter.getAllCustomerAddress)
// router.get("/customer/getdetail", customerRouter.findcustomerDeatil)
router.get("/customer/find/", customerRouter.searchAndFilter)
router.get("/product/customer/",  customerRouter.getAllProduct)
router.post("/customer/login/", customerRouter.loginWithPhoneNumber)
router.put("/customer/Address/",customerRouter.updateAddress)
router.post("/customer/generateOtp",customerRouter.genrateOtp)

module.exports = router