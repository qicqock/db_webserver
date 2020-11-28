var express = require('express');
var router = express.Router();

// chanwoong routing
router.get('/', function(req, res, next) {
    if(!req.cookies['customer_id']){
      res.render('chanwoong/index', { 
        title: 'Home' , 
        cust_info:null
      });
    } else{
      res.render('chanwoong/index', { 
        title: 'Home' , 
        cust_info: [req.cookies.customer_id, req.cookies.customer_name],
      });
    }
});

router.get('/room', function(req, res, next) {
  res.render('../views/chanwoong/room', { title: 'Room' , cust_info:null});
  if(!req.cookies['customer_id']){

  } else {

  }
});

router.get('/booking', function(req, res, next) {
    res.render('../views/chanwoong/booking', { title: 'Booking' , cust_info:null});
    if(!req.cookies['customer_id']){

    } else {

    }
});

module.exports = router;