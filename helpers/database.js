const mongoose = require('mongoose');
require('dotenv').config()


// var db = "mongodb://localhost:27017/mcart"
mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true });
const conSuccess = mongoose.connection
conSuccess.once('open', res => {
  console.log('Database connected:',)
})

conSuccess.on('error', err => {
  console.error('connection error:', err)
})

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0)
})