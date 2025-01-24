const express = require('express');
const mongoose = require('mongoose');
const userRoute = require("./routes/userRoute");
const sampleRoute = require("./routes/sampleRoute");
const cors = require('cors')
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config()

const allowedOrigins = [
    'http://localhost:8081',      // Web on localhost
    'http://localhost:3000',       // Backend testing from localhost
    'https://requin-sample-project-jjd9.vercel.app/'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like from tools such as Postman)
      if (!origin) return callback(null, true);
      
      // Check if the origin is in the allowed list
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true  // Allow cookies and credentials to be passed
  }));


app.use(bodyParser.json())
app.use(express.json())
app.use(fileUpload())
app.use("/api", userRoute)
app.use("/sample", sampleRoute)


mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to database")
})
.catch(()=>{
    console.log("not connected")
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`)
})
