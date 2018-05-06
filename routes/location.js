var express = require('express');
var helpers = require('../helpers');
var router = express.Router({mergeParams:true});

//REGISTERING WORKER
router.get("/api/worker/:name/:lat/:long/:number/:category",function(req,res){
   var workerData ={name:req.params.name,
                    lat:req.params.lat,
                    long:req.params.long,
                    number:req.params.number,
                    category:req.params.category,
                    flag:false}; 

   helpers.addWorker(workerData).then(function(){
     res.json({"response":true});  
   }).catch(function(err){
     res.json({"response":false});
   });

});

//VICINITY CHECK OF USER WITHIN RANGE OF WORKER
router.get("/api/checkVicnity/:lat/:long/:userLat/:userLong",function(req,res){
      var checkPoint ={lat:req.params.userLat,long:req.params.userLong};
      var centerPoint = {lat:req.params.lat,long:req.params.long};
      var ans = helpers.arePointsNear(checkPoint,centerPoint,1000);
      if(ans)
        res.json(true);
      else
        res.json(false);
});

//PUTTING SERVICE REQUESTED IN DATABASE
router.get("/api/:service/:lat/:lng/:number",function(req,res){

    var customerLocation= {services:req.params.service, lat:req.params.lat, lng:req.params.lng,number:req.params.number,status:false};
    helpers.addCustomerService(customerLocation).then(function(){
    
    //  helpers.getlocation(req.params.service).then(function(workersLocation){
        //  console.log("workersLocation",workersLocation);
        //  var ans=helpers.arePointsNear(workersLocation,customerLocation,10000);
        //  console.log(ans);
          res.json({"response":true});
        }).catch(function(err){
           res.json({"response":false});
        });
   
});

//FETCH DATA OF USERS WHOOSE SERVICE IS NOT FULLFILLED YET
router.get("/api/fetchData",function(req,res){
 
   helpers.getAllUsers().then(function(userArr){
      res.json({"response":userArr});
   }).catch(function(err){
      res.json({"response":false});
   }); 
});

//UPDATING DATA OF USER AFTER THE WORKER ACCEPT THE REQ
router.get("/api/updateUser/:num",function(req,res){
   helpers.updateUser(req.params.num).then(function(ans){
      res.json({"response":true});
   }).catch(function(err){
      res.json({"response":false});
   });
});







module.exports = router;