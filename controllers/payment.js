// const customerModel= require("../models/customer")
// var paymentModel=require("../models/payment")
// var crypto = require('crypto');

// const addPayment =  async (req,res) => {
// try{
//     let { id} = req.query
//    let PaymentKey = crypto.randomBytes(5).toString('hex');
//     // flag:await customerModel.find({email:email})

//     const addPayment = new paymentModel({
//     customer_Id:req.params.customer_Id,
//     email: req.body.email,
//     cardnumber :req.body.cardnumber,
//     cardname :req.body.cardname,
//     cardholdername: req.body.cardholdername,
//     CVV : req.body.CVV,
//     expdate : req.body.expdate,
    
//     })
    
 
//      //cardmodel.insertMany(req.body).then(()=>res.send("inserted successfully")).catch((err)=>res.send(err))
//      const flag =  await customerModel.findOne({_id:id})

//      if(flag.length!=0){
  
//       var data = {
//         email : email,cardnumber: cardnumber,cardname : cardname,cardholdername: cardholdername,CVV : CVV,expdate : expdate,PaymentKey:PaymentKey
//     }
//     var doc1=new cardmodel(data);
//     console.log(data)
//     await doc1.save().then(()=>res.send("Insert Successfully")).catch((err)=>res.send(err));
//  }
//     else{
//     res.send('Email Not Found')
//  }

// }catch(error){
//  return res.send(500).json({error:error,error:error.message, success:false, })
// }}

// const getPayment =  async (req, resp) => {
//       let data =await cardmodel.find();
//       resp.json(data);
                                           
// }



// const updatePayment = async (req, resp) => {

//    var {cardnumber,cardname,cardholdername,CVV,expdate} = req.body
//    const key = req.params.key

//    var result = await cardmodel.updateOne({key},{$set: {
//       cardnumber,cardname,cardholdername,CVV,expdate
//   }});
//   resp.send(result)
//  // console.log(result)
// }

// module.exports={
//    getPayment,addPayment,updatePayment
// }

const paymentSheet = async function (req, res, next) {
   const findCustomer = await customer.find({_id:req.params.id})
   const name = findCustomer.firstName+" "+ findCustomer.lastName
   const email = findCustomer.email
   const phone = findCustomer.phoneNumber
   const {customer_Id, cardnumber, cardname, cardholdername, CVV, expdate } = req.body
   // const user = await User.findOne({ _id: userId }).lean().exec();
   const customer = await stripe.customers.create({
     name: name,
     address: {
       // city: address,line1: '510 Townsend St',
       postal_code: '98140',
       city: 'San Francisco',
       state: 'CA',
       country: 'US'
     },
     email: email,
     phone: phone,
   });
   const ephemeralKey = await stripe.ephemeralKeys.create(
     { customer: customer.id },
     { apiVersion: '2020-08-27' }
   );
   const paymentIntent = await stripe.paymentIntents.create({
     amount: totalPrice,
     currency: 'USD',
     shipping: {
       name: name,
       address: {
         line1: '510 Townsend St',
         postal_code: '98140',
         city: 'San Francisco',
         state: 'CA',
         country: 'US',
       },
     },
     customer: customer.id,
     automatic_payment_methods: {
       enabled: true,
     },
     description: "payment"
   });
   console.log(description)
   return res.json({
     message: "Payment Intent created successfully ",
     data: { paymentIntent: paymentIntent.client_secret, ephemeralKey: ephemeralKey.secret, customer: customer.id, publishableKey: process.env.PUBLISHABLE_KEY },
     status: 200,
     success: true,
   });
 };