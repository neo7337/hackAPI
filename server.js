var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hackacthon:hackathon@ds115740.mlab.com:15740/hack';

//Requiring routes
var location = require("./routes/location");

app.use("/",location);
app.listen(process.env.PORT||3000,function(){
  console.log("Server Started :)!");
});