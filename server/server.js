const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//app
const app = express();

//database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to Mongo DB successful"))
  .catch((error) => console.log(`DB Connection Error ${error}`));

//middleware
app.use(cors());
// json() is a built-in middleware function in Express.
// This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser.
app.use(express.json());

//routes
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Started listening on port ${PORT}`);
});
