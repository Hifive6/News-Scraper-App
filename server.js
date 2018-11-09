var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars")
var path = require("path")
require('dotenv').config()



var db = require("./models/");

var PORT = process.env.PORT;

var app = express();
app.use(logger("dev"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')


//app.use("/", htmlRouter);
//app.use("/", articleRouter)
var MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);



require('./controllers/articleRoute')(app);

app.listen(PORT, function(){
    console.log("App is running on PORT " + PORT + " !")
})

