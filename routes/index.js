var express = require('express');
var router = express.Router();

// chanwoong routing
router.get('/', function(req, res, next) {
    if(!req.cookies['customer_id'] && !req.cookies['employee_id']){
      res.render('chanwoong/index', { 
        title: 'Home' , 
        cust_info:null
      });
    } else if(!req.cookies['employee_id']){
      res.render('chanwoong/index', { 
        title: 'Home' , 
        cust_info: [req.cookies.customer_id, req.cookies.customer_name, false],
      });
    } else {
      res.render('chanwoong/index',{
        title: 'Home',
        cust_info: [req.cookies.employee_id, req.cookies.employee_name, true],
      })
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