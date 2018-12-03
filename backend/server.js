const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const User = require('./models').User;
const userRoutes = require('./routes/users')

require("dotenv").config();

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3001;

const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(logger("dev"));

router.post('/usersignin/', (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.json({
      success: false,
      error: "Not all fields have been completed"
    })
  }
})

app.use('/api', router);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(`${__dirname}/../frontend/dist`));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
  });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));