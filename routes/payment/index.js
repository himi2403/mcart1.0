const express = require("express")
const router = express.Router()
const PaymentController = require("../../controllers/payment")
// const {req}


router.post("/addCard",PaymentController.addPayment)
router.post("/addPayment", PaymentController.doPayment)
router.put("/paymentstatusUpdate",PaymentController.paymentSuccessfully)

module.exports = router