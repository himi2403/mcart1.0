const express = require('express');
const router = express.Router();
const { requestValidator } = require('../../middleware');
const schema = require('./schema');
const merchantController = require('../../controllers/merchant')

const token = require("../../helpers/jwt_helpers")


router.post('/merchant/addMerchant',
requestValidator(schema.addMerchant),
merchantController.addMerchant);
  
router.get("/merchant/getMerchant",token.verifyAccessToken,
 merchantController.getMerchant)

router.post("/merchant/login", 
merchantController.merchantLogin )


router.delete("/merchant/deleteMerchant/:id", token.verifyAccessToken,
requestValidator(schema.getId,"params"), merchantController.deleteMerchant )

// router.post("/addproduct", merchantController.addProduct)

// router.get("/merchant/inventory/:id", merchantController.productgetbymerchantid)

router.put("/merchant/updateMerchant", token.verifyAccessToken,merchantController.merchantupdate)

router.get("/merchant/merchantprofile/:id" ,token.verifyAccessToken,requestValidator(schema.getId,"params"),merchantController.merchantProfile )

module.exports = router