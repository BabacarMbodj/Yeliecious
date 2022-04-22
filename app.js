//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {
    res.send("The server is up and running");
})

mongoose.connect("mongodb://localhost:27017/yelieciousDB");

app.listen(3000, function (req, res) {

    console.log("Server running at localhost 3000");
});