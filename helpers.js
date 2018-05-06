var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hackacthon:hackathon@ds115740.mlab.com:15740/hack';

//Container for helpers
var helpers={};


//checking the location of worker nearby 
helpers.arePointsNear=function(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
      	
       var dx = Math.abs(centerPoint.long - checkPoint.long) * kx;
       var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
   
       if(Math.sqrt(dx * dx + dy * dy) <= km)
       {
          return true;
       }
       else{
        return false;
       }
 

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

helpers.addCustomerService= function(customerData){
     
     return new Promise(function(resolve,reject){
       
      MongoClient.connect(url, function(err, db) {
      
        var dbo = db.db("hack");
        dbo.collection("customerServices").insertOne(customerData, function(err, res) {
          if (err){
            reject(false);
          }
          else{
            resolve(true);
          }
       
          db.close();
        });
      });

     });
};
  
helpers.addWorker = function(workerData){
    return new Promise(function(resolve,reject){
       
      MongoClient.connect(url, function(err, db) {
      
        var dbo = db.db("hack");
        dbo.collection("workers").insertOne(workerData, function(err, res) {
          if (err){
            reject(false);
          }
          else{
            resolve(true);
          }
       
          db.close();
        });
      });

     });
};

helpers.getAllUsers=function(){
    return new Promise(function(resolve,reject){
     MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db('hack');
      var query = { status:false};
      dbo.collection("customerServices").find(query).toArray(function(err, result) {
          if (err){
            reject(err);
          }
         else{
           resolve(result);
         }
      });
    });
   
  });
}

helpers.updateUser=function(num){
  return new Promise(function(resolve,reject){
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("hack");
        console.log(num);
        var myquery = { number:parseInt(num,10)};
        var newvalues = { $set: {status:true} };
        console.log(myquery+" "+newvalues);
        dbo.collection("customerServices").updateOne(myquery, newvalues, function(err, res) {
          if (err){
            reject(err);
          }
         else{
           resolve(res);
         }
          
          db.close();
        });
      });
  });
}

module.exports=helpers;  