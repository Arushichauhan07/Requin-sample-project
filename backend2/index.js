const express = require('express');
const mongoose = require('mongoose');
const userRoute = require("./routes/userRoute");
const sampleRoute = require("./routes/sampleRoute");
const cors = require('cors')
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config()

<<<<<<< HEAD
app.use(
    cors({
      origin: "https://requin-sample-project-jjd9.vercel.app", // Frontend URL
      credentials: true, // Enable cookies
    })
  );
=======
app.use(cors([{
    origin: ['https://requin-sample-project-jjd9.vercel.app']
}]));
>>>>>>> 77629eaef1b41cdc251afe5f2ee8bd2db2cbb2e9

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
