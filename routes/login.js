var express = require('express');
var router = express.Router();
var connection = require('./db');

router.get('/', function(req, res, next) {
  res.render('chanwoong/login', { title: 'Login' , cust_info:null});
});

router.post('/',function (req,res) {
    var userid = req.body.userid;
    var userpwd = req.body.userpwd;
    var isEmployee = req.body.isEmployee;

    console.log("이거 우찌 나오냐??" + isEmployee);
    if(isEmployee == undefined){
      var user = new Object(); // user 객체 생성
      connection.query('SELECT * FROM CUSTOMER natural join PERSON WHERE login_id = ? AND login_pw = ?', [userid, userpwd], function (error, result, fields) {
        if (error) {
          console.log("왜왜왜오애왜왜애");
          console.log(error);
        }else {
          console.log(result);
          if (result.length == 0) {
              user.customer_id = null;
              console.log("일치하는 아이디 없음");
              res.redirect('/login');
          } else{
            console.log("로그인 성공!");
            user.customer_id = result[0]['CUSTOMER_ID'];
            user.customer_name = result[0]['KOR_LAST_NAME'] + result[0]['KOR_FIRST_NAME'];
            console.log(user.customer_id);

            console.log("이거나오고 뒤에꺼가 안나온다 그거지??");
            res.cookie('customer_id', user.customer_id,{
              maxAge : 60*60*1000,
            });
            res.cookie('customer_name', user.customer_name,{
              maxAge : 60*60*1000,
            });
            res.redirect('/');
          }
        }
    });
  } else {
    var employee = new Object();
    connection.query('SELECT * FROM EMPLOYEE natural join PERSON WHERE login_id = ? AND login_pw = ?',[userid,userpwd],function(error,rows){
      if (error) {
        console.log("왜왜왜오애왜왜애");
        console.log(error);
      }else {
        console.log(rows);
        if (rows.length == 0) {
            employee.customer_id = null;
            console.log("일치하는 아이디 없음");
            res.redirect('/login');
        } else{
          console.log("로그인 성공!");
          employee.emp_id = rows[0]['login_id'];
          employee.emp_name = rows[0]['KOR_LAST_NAME'] + rows[0]['KOR_FIRST_NAME'];
          console.log(employee.customer_id);

          console.log("이거나오고 뒤에꺼가 안나온다 그거지??");
          res.cookie('employee_id', employee.emp_id,{
            maxAge : 60*60*1000,
          });
          res.cookie('employee_name', employee.emp_name,{
            maxAge : 60*60*1000,
          });
          res.redirect('/');
        }
      }
    });
  }    
});

module.exports = router;