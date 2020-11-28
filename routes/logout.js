var express = require('express');
var router = express.Router();
var connection = require('./db');

/* GET home page. */
router.get('/', function (req, res) {
        res.clearCookie('customer_id');
        res.clearCookie('customer_name');
        res.clearCookie('employee_id');
        res.clearCookie('employee_name');
        res.redirect('/');
});

module.exports = router;