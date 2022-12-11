const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload")
const dotenv=require("dotenv");
const errorMiddleware = require("./middleware/error")

const cors=require("cors");
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 app.use(cors(corsOptions)) // Use this after the variable declaration


//config
dotenv.config({path:"config/config.env"});


app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//route imports
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute");
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment)


//middleware for errors
app.use(errorMiddleware);
module.exports= app;