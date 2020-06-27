const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// Database Connection Request
require('dotenv/config');
const connectDB = require("./config/connectDB.js");

// const PORT = 5000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const PORT = process.env.PORT || 9090;
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", { useNewUrlParser: true });

// routes
app.use(require("./routes/api.js"));
connectDB()
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}! -- http://localhost:${PORT}/`);
});