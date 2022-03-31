const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
const usersRouter = require("./routes/users");
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://secret-savannah-40959.herokuapp.com"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/users", usersRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
