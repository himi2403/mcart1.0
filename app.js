const express = require('express');
const morgan= require('morgan')
const createError = require('http-errors')
require('dotenv').config()
const cors = require('cors');
require('./helpers/database');

const merchantroutes = require('./routes/merchant/index');
const productroutes = require("./routes/product/index")
const orderRouter = require("./routes/order/index")
const customerRouter =  require("./routes/customers/index")
const addressRouter = require("./routes/address/index")
const cartRouter = require("./routes/cart/index")
const payment = require("./routes/payment/index")
const adminRouter = require("./routes/admin/index")

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get("/", (req,res) =>{
    res.send("hello from this side")
})
app.use("/dev-api-mcart.com", merchantroutes);
app.use("/dev-api-mcart.com", productroutes)
app.use("/dev-api-mcart.com", orderRouter)
app.use("/dev-api-mcart.com", customerRouter)
app.use("/dev-api-mcart.com/address", addressRouter)
app.use("/dev-api-mcart.com/cart", cartRouter)
app.use("/dev-api-mcart.com/payment", payment)
app.use("/dev-api-mcart.com/admin", adminRouter)

    app.use(async(req,res,next)=>{
        next(createError.NotFound('This route does not exist'))
    })

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status||500,
            message:err.message
        }
    })
    
})
const PORT = process.env.PORT || 8000
 app.listen(PORT,()=>{
     console.log(`server running on port ${PORT}`)
 })
