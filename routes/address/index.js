const express = require("express")
const {requestValidator} = require("../../middleware")
const schema = require("./schema")
const router = express.Router()

const addressController = require("../../controllers/address")
const address = require("../../controllers/address")

router.post("/customer/address", requestValidator(schema.addnewaddress),addressController.UserAddress)
// router.get("/customer/getDetail", addressController.)
router.delete("/customer/delete", addressController.deleteAddress)
 router.put("/customer/update", requestValidator(schema.updateAddress), addressController.updateAddress)
 
module.exports = router