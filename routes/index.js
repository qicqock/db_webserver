var express = require('express');
var router = express.Router();

var mysql      = require('mysql');

var db_config = {
  host     : 'us-cdbr-east-02.cleardb.com',
  user     : 'b0d7db5a46255f',
  password : 'e0ba2ce1',
  database : 'heroku_a9f9515c41ce864'
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

router.get('/', function(req, res, next) {
  res.render('../views/chanwoong/index', { title: 'Home' , cust_info:null});
});
router.get('/login', function(req, res, next) {
  res.render('../views/login', { title: 'Login' });
});
router.get('/register', function(req, res, next) {
  res.render('../views/chanwoong/register', { title: 'register' });
});
router.get('/reservation', function(req, res, next) {
  res.render('../views/reservation', { title: 'Reservation' });
});
router.get('/room', function(req, res, next) {
  res.render('../views/room', { title: 'Room' });
});

router.post('/main',function (req,res){
  var userid = req.body.userid;
  var userpwd = req.body.userpwd;
  connection.query('SELECT customer.ID, login_id,login_pw, ENG_FIRST_NAME FROM customer cross join person WHERE person.id=customer.person_id and login_id = ?',[userid],function (error, result, fields) {
    if (error) {
      console.log(error);
    }
    if(result.length == 0){
      console.log("일치하는 아이디 없음");
      res.render('../views/login', {title: 'Login'});
    }
    else{
    for (var i = 0; i < result.length; i++) {
      if (result[i].login_pw == userpwd) {
        console.log("로그인 성공");
        res.render('../views/chanwoong/index', {title: 'Home',cust_info:result[i]});
        break;
      }
      else {
        console.log("로그인 실패...");
        res.render('../views/chanwoong/login', {title: 'Login'});
      }
    }
  }
})

  //connection.end();
})

module.exports = router;