var express = require('express');
var router = express.Router({mergeParams:true});
router.post("/api/:service/:lat/:lng",function(req,res){

   var stockholm = { lat:req.params.lat, lng:req.params.lng};

   //already in database
   var vasteras =  [{ lat: 59.615911, lng: 16.544232 },{lat:49.3456,lng:11.0900}];

   function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var arr =[];
    checkPoint.forEach(function(element) {
       var dx = Math.abs(centerPoint.lng - element.lng) * kx;
       var dy = Math.abs(centerPoint.lat - element.lat) * ky;
       //console.log("object is: ", element.lng);
       if(Math.sqrt(dx * dx + dy * dy) <= km)
       {
          arr.push(element);
       }
     });
    return arr;
  }
  var ans = arePointsNear(vasteras, stockholm, 1000);
  res.json(ans);
});

module.exports = router;