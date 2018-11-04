var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars")

var Comment = require("./models/Comments")
var Article = require("./models/Article")

var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");

var PORT = 3000;

var app = express();

app.use(express.static("public"));
app.use("/", htmlRouter);
app.use("/", articleRouter)

mongoose.connect("mongodb://localhost/newScraper");








app.listen(PORT, function(){
    console.log("App is running on PORT " + PORT + " !")
})

