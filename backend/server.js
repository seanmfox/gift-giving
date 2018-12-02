const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const User = require('./models').User;

require("dotenv").config();

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3001;

const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(logger("dev"));

router.post('/users/', (req, res) => {
  const user = new User();
  const { fname, lname, email, password } = req.body;
  if(!fname || !lname || !email || !password) {
    return res.json({
      success: false,
      error: "Not all fields have been completed"
    })
  }
  bcrypt.hash(password, 10).then(hash => {
    user.fname = fname;
    user.lname = lname;
    user.email = email;
    user.password = hash;
    user.save(err => {
      if(err) return res.json({success: false, error: err});
      return res.json({success: true})
    })
  })
})

app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));