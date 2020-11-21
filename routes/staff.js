var express = require('express');
var router = express.Router();
var connection = require('./db');


var ep_list = null;

router.get('/', function(req, res, next) {
    var sql1 = 'select * from EMPLOYEE natural join PERSON';
    connection.query(sql1, function (error, result, fields) {
        if (error) {
            console.log("error발생");
            console.log(error);
        }
        ep_list = result;
        console.log(ep_list);
    })
    res.render('../views/chanwoong/staff', {
        title: 'Staff' ,
        cust_info:null,
        staff_list : ep_list
    });
});
router.post('/', function(req, res, next) {
    res.render('../views/chanwoong/staff', {
        title: 'Staff' ,
        cust_info:null,
        staff_list : ep_list
    });
});


module.exports = router;