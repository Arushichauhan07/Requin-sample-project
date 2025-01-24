const express = require('express');
const mongoose = require('mongoose');
const userRoute = require("./routes/userRoute");
const sampleRoute = require("./routes/sampleRoute");
const cors = require('cors')
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config()

const corsOptions = {
    origin: (origin, callback) => {
      if (origin && origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  };
  

app.use(cors(corsOptions))
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
