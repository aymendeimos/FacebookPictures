const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4200;
const cors = require("cors");

// Mongoose connection with mongodb
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost:27017/")
  .then(() => { // if all is ok we will be here
    console.log("Start");
  })
  .catch(err => { // if error we will be here
    console.error("App starting error:", err.stack);
    process.exit(1);
  });

// Required application specific custom router module
const userRouter = require("./src/routes/userRoutes");

// Use middlewares to set view engine and post json data to the server
app.use(cors());
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true
}));
app.use("/users", userRouter);

// Start the server
app.listen(port, function () {
  console.log("Server is running on Port: ", port);
});