var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hackacthon:hackathon@ds115740.mlab.com:15740/hack';

//Container for helpers
var helpers={};


//checking the location of worker nearby 
helpers.arePointsNear=function(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var arr =[];
    checkPoint.forEach(function(element) {
    	
       var dx = Math.abs(centerPoint.lng - element.long) * kx;
       var dy = Math.abs(centerPoint.lat - element.lat) * ky;
   
       if(Math.sqrt(dx * dx + dy * dy) <= km)
       {
          arr.push(element);
       }
     });

    return arr;
  }

helpers.getlocation= function(service){
 // Use connect method to connect to the server
  return new Promise(function(resolve,reject){
       var ans=[];
	   MongoClient.connect(url, function(err, db) {
		 	if (err) throw err;
			var dbo = db.db('hack');
			var query = { category:service};
		 dbo.collection("workers").find(query).toArray(function(err, result) {
	        if (err){
	        	reject(err);
	        }
	       else{
	    	   resolve(result);
	       }
	    });
	  console.log("Connected successfully to server");
	  });
   
  });
} 

module.exports=helpers;  