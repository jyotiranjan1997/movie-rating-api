const express = require("express");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();
const { UserModel } = require("../models/user.model");
const privateKey = process.env.privateKey;
const bcrypt = require("bcrypt");

const validation = (req, res, next) => {
  let data = req.body;

  if (
    typeof data.name !== "string" ||
    typeof data.email !== "string" ||
    typeof data.password !== "string"
  ) {
    res.send({ msg: "Data can not be send type Error !!" });
  } else if (data.name === "" || data.email === "" || data.password === "") {
    res.send({ msg: "Data can not be send Empty field !!" });
  } else {
    next();
  }
};

userRoute.post("/signup",validation , async (req, res) => {
  const {name,email,password} = req.body;
  const saltRounds = 10;
  try {
    bcrypt.hash(password, saltRounds,async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.send({ msg: "Something went wrong cann't Register" });
      } else {
        const user = new UserModel({name,email,password:hash});
    await user.save();
    res.send({ msg: "user Registered successfully" });
      }
    });
    
  } catch (err) {
    res.send({ msg: "Something went wrong cann't Register" });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await UserModel.findOne({ email});
if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      // result == true
      if (result) {
        let token = jwt.sign({ id: user._id }, privateKey);

        res.send({ msg: "sucessfully logged in", token: token });
        
      }
      if (err) {
        res.send({ msg: "Password doesn't match" });
      }
    });
  
    } else {
      res.send({ msg: "user Loggged Failed" });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong cann't Login" });
  }
});

userRoute.patch("/", async (req, res) => {
  try {
  } catch (err) {}
});

userRoute.delete("/", async (req, res) => {
  try {
  } catch (err) {}
});

module.exports = { userRoute };
