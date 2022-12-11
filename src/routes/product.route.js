const express = require("express");
const { authorization } = require("../middleware/authmidleware");
const noteRoute = express.Router();
const { MovieModel } = require("../models/product.model");

noteRoute.get("/", async (req, res) => {
  const { page } = req.query;
  console.log(page)
  const skip = 8 * (+page-1);
  
  try {
    let products = await MovieModel.find().limit(8).skip(skip);
    console.log(products)
    res.send(products);
  } catch (err) {
    res.send({ err: "cann't get Items" });
  }
});

noteRoute.get("/count", async (req, res) => {
  try {
    let count = await MovieModel.countDocuments({});
    
    res.send({count});
  } catch (err) {
    res.send({ err: "cann't get Items" });
  }
});

noteRoute.post("/add", authorization, async (req, res) => {
  let payload = req.body;
  
  try {
    let product = new MovieModel(payload);
    await product.save();
    res.send({ msg: "product added successfully" });
  } catch (err) {
    res.send({ err: "product added falied" });
  }
});

noteRoute.patch("/auth/:productID", authorization, async (req, res) => {
  const productID = req.params.productID;
  const payload = req.body;
  try {
     let movie = await MovieModel.findOne({
       _id: productID,
       user: payload.user,
     });
     if (movie) {
       res.send({ msg: true });
     } else {
       res.send({ msg: false });
     }
  } catch (err) {
    
  }
 
});
noteRoute.patch("/:productID", authorization, async (req, res) => {
  const productID = req.params.productID;
  const payload = req.body;
  try {
    let movie = await MovieModel.findOne({
      _id: productID,
      user: payload.user,
    });
    if (movie) {
      try {
        await MovieModel.findByIdAndUpdate({ _id: productID }, payload);
        res.send({ msg: "Updated Successfully" });
      } catch (err) {
        res.send({ msg: "Updated Failed" });
      }
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } catch (err) {
    res.send({ msg: "Error" });
  }
});
noteRoute.delete("/:productID", authorization, async (req, res) => {
  const productID = req.params.productID;
  const user = req.body.user;
  console.log(user);
  try {
    let movie = await MovieModel.findOne({ _id: productID, user: user });
    if (movie) {
      try {
        await MovieModel.findByIdAndDelete({ _id: productID });
        res.send({ msg: "Deleted Successfully" });
      } catch (err) {
        res.send({ msg: "Deleted Failed" });
      }
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } catch (err) {
    res.send({ msg: "Error" });
  }
});

module.exports = { noteRoute };
