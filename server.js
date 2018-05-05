var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hackacthon:hackathon@ds115740.mlab.com:15740/hack';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db('hack');
	//console.log(db);
	 dbo.collection("workers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
   // db.close();
  });
  console.log("Connected successfully to server");

  db.close();
});