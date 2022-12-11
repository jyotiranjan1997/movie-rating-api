require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connect } = require("./src/config/db");
const { userRoute } = require("./src/routes/user.route");
const { noteRoute }=require("./src/routes/product.route")

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/movie", noteRoute);


app.listen(PORT, async() => {

    await connect();
    console.log(`listening at ${PORT}`)
})