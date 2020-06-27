const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 5000;

const app = express();

// variable set for connection to mLab MongoDB addon
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_c5hz9lvs:5njoktcqp62hrnfqq5o27mgt87@ds147070.mlab.com:47070/heroku_c5hz9lvs";

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// needed for connection to mLab MongoDB add-on 
mongoose.connect(MONGODB_URI);

// local connection
mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}! -- http://localhost:${PORT}/`);
});