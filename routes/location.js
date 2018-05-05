var express = require('express');
var helpers = require('../helpers');
var router = express.Router({mergeParams:true});

router.post("/api/:service/:lat/:lng",function(req,res){

    var customerLocation= { lat:req.params.lat, lng:req.params.lng};
    helpers.getlocation(req.params.service).then(function(workersLocation){
          console.log("workersLocation",workersLocation);
          var ans=helpers.arePointsNear(workersLocation,customerLocation,10000000000000);
          console.log(ans);
          res.json(ans);
    }).catch(function(err)
    {
        console.log(err);
    })
    
});

module.exports = router;