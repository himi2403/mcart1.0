// const orderRouter = require("../../controllers/orders")
const orderRouter = require("../../controllers/orders")
const express = require("express")
const {requestValidator} = require("../../middleware")
const schema = require("./schema")
const router = express.Router()
const token = require("../../helpers/jwt_helpers")

router.post("/customer/postOrder",requestValidator(schema.getId), orderRouter.postorder)
// router.get("/customer/postOrders/", orderRouter.updateOrderStatus)
router.put("/customer/updateOrder/:id", orderRouter.updateOrderStatus)
router.delete("/customer/cancelOrder", orderRouter.cancelOrder)

router.get("/order/detail/:id", orderRouter.getOrderdetail)
module.exports = router