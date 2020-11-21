var express = require('express');
var router = express.Router();
var connection = require('./db');

router.get('/', function(req, res, next) {
    res.render('../views/chanwoong/staff', { title: 'Staff' , cust_info:null});
});

module.exports = router;