var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars")

var Comment = require("./models/Comments")
var Article = require("./models/Article")

var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models/");

var PORT = 3000;

var app = express();

app.use(express.static("public"));
//app.use("/", htmlRouter);
//app.use("/", articleRouter)

mongoose.connect("mongodb://localhost/newScraper");

app.get("/scraped", function(req, res){
    axios.get("https://www.npr.org/sections/news/archive")
    .then(function(response){
        var $ = cheerio.load(response.data);

        $("div.archivelist > article").each(function(i, element){
            
            var result ={};
            
            //result.title = $(this).children().find("a").text()
            result.title = $(element).children().find("h2.title").text()
            result.summary = $(element).children().find("p.teaser").text()
            result.link = $(element).children().find("a").attr("href")
            
            db.Article.create(result)
            .then(function(dbArticle){
                console.log(dbArticle);
            })
            .catch(function(err){
                return res.json(err);
            })
        })
        res.send("Scraped Complete")
    })
})




app.listen(PORT, function(){
    console.log("App is running on PORT " + PORT + " !")
})

