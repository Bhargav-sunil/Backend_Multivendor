const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const vendorRoutes = require("./routes/vendorRoutes")
const firmRoutes = require("./routes/firmRoutes")
const productRoutes = require('./routes/productRoutes')


const app = express()
const PORT = 4000;

dotenv.config()
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Database connected Successfully"))
.catch(err=> console.log(err))


app.listen(PORT,() => {
    console.log(`Server started at PORT: ${PORT}`)
})

app.use(bodyParser.json())
app.use('/vendor', vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))