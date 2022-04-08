const express = require("express")
const router = express.Router()
const PaymentController = require("../../controllers/payment")
// const {req}


router.post("/addPayment",PaymentController.addPayment)

module.exports = router