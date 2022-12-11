const mongoose = require("mongoose");

const DB = process.env.DB;
const connect = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Db connected");
  } catch (err) {
    console.log("Db connection failed");
  }
};

module.exports = { connect };
