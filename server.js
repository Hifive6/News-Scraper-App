var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars")
require('dotenv').config()



var db = require("./models/");

var PORT = process.env.PORT;

var app = express();
app.use(logger("dev"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

//app.use("/", htmlRouter);
//app.use("/", articleRouter)
var MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);


mongoose.connect("mongodb://localhost/nprScraped");

// app.get("/scraped", function(req, res){
//     axios.get("https://www.npr.org/sections/news/archive")
//     .then(function(response){
//         var $ = cheerio.load(response.data);

//         $("div.archivelist > article").each(function(i, element){
            
//             var result ={};
            
            
//             result.title = $(element).children().find("h2.title").text()
//             result.summary = $(element).children().find("p.teaser").text()
//             result.link = $(element).children().find("a").attr("href")
            
//             db.Article.create(result)
//             .then(function(dbArticle){
//                 console.log(dbArticle);
//             })
//             .catch(function(err){
//                 return res.json(err);
//             })
//         })
//         res.send("Scraped Complete")
//     })
// })

// app.get("/articles", function(req, res) {
//     // Grab every document in the Articles collection
//     db.Article.find({})
//       .then(function(dbArticle) {
//         // If we were able to successfully find Articles, send them back to the client
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });

//   app.get("/articles/:id", function(req, res) {
//     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//     db.Article.findOne({ _id: req.params.id })
//       // ..and populate all of the notes associated with it
//       .populate("Comment")
//       .then(function(dbArticle) {
//         // If we were able to successfully find an Article with the given id, send it back to the client
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });

//   app.post("/articles/:id", function(req, res) {
//     // Create a new note and pass the req.body to the entry
//     db.Note.create(req.body)
//       .then(function(dbComment) {
//         // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//         // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//         // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//         return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
//       })
//       .then(function(dbArticle) {
//         // If we were able to successfully update an Article, send it back to the client
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });
//require('./controllers/html-routes')(app)
require('./controllers/articleRoute')(app);

app.listen(PORT, function(){
    console.log("App is running on PORT " + PORT + " !")
})

