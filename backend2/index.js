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
  origin: function (origin, callback) {
    const allowedOrigins = [
       '*',
      'https://requin-sample-project.vercel.app',
      'https://requin-sample-project-jjd9-irfmsx14i-arushis-projects-19759d41.vercel.app'
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow requests from the allowed origins (or allow requests without an origin, like curl)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date']
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
