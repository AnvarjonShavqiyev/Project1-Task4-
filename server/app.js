const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://anvarjonshavqiyev68:" +
    process.env.MONGO_PASSWORD +
    "@cluster1.hc6wtxf.mongodb.net/?retryWrites=true&w=majority"
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require("./api/routes/user");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});

app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("This route is not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});
module.exports = app;
