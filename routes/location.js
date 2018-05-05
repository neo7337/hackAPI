var express = require('express');
var helpers = require('../helpers');
var router = express.Router({mergeParams:true});


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

router.get("/api/:service/:lat/:lng",function(req,res){

    var customerLocation= {services:req.params.service, lat:req.params.lat, lng:req.params.lng,status:false};
    helpers.addCustomerService(customerLocation).then(function(){
    
      helpers.getlocation(req.params.service).then(function(workersLocation){
          console.log("workersLocation",workersLocation);
          var ans=helpers.arePointsNear(workersLocation,customerLocation,10000);
          console.log(ans);
          res.json({"response":true});
        }).catch(function(err)
        {
          res.json({"response":false});
        });
      }).catch(function(err){
         console.log(err);
        });
   
    
});



module.exports = router;