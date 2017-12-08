const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan")
const autoIncrement = require('mongoose-auto-increment');
const expressJwt = require("express-jwt");
const path = require("path");

const settings = require("./settings");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());


const connection = mongoose.connect(settings.db, (err)=>{
  if(err) throw err;
  console.log("Connected to the database")
})
// mongoose.connect(
//   "mongodb://localhost/cupcake", 
//   { keepAlive: true, reconnectTries: Number.MAX_VALUE, useMongoClient: true }, 
//   (err)=>{
//     if(err) throw err;
//     console.log("Connected to the database")
//   }
// )
autoIncrement.initialize(connection);

app.use(express.static(path.resolve(__dirname, "client", "build")));


app.use("/cupcake", require("./routes/cupcakeRoutes"))
app.use("/order", require("./routes/orderRoutes"))

app.use("/admin", require("./routes/adminRoutes"))
app.use("/admin/orders", require("./routes/orderListRoutes"))

app.get(/[\s\S]*/, (req, res)=>{
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
});



app.listen(settings.port, ()=>{
  console.log(`this server is runnning on port ${settings.port}`)
})

// app.listen(port, ()=>{
//   console.log(`this server is runnning on port ${port}`)
// })