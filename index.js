var express = require('express');
var app = express();

//Requiring routes
var location = require("./routes/location");

app.use("/",location);
app.listen(process.env.PORT||3000,function(){
  console.log("Server Started :)!");
});