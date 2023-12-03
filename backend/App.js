const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true, 
    useUnifiedTopology: true }
    )
  .then(() => {
    console.log("Database connected succesfully");
  })
  .catch(er => {
    console.log(er, "failed to connect database");
  });

const app = express();
/// middelware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

const user = require('./Router/auth')

app.use("/api",user)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT} `);
});
