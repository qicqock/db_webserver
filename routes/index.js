var express = require('express');
var router = express.Router();

var mysql      = require('mysql');

var db_config = {
  host     : 'us-cdbr-east-02.cleardb.com',
  user     : 'b0d7db5a46255f',
  password : 'e0ba2ce1',
  database : 'heroku_a9f9515c41ce864'
};



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

<<<<<<< HEAD
=======


//vars for post method
var cust_info = null;//라우터가 처음 실행될 때 로그인 안된 상태를 표현
var available_roomtypes = null;


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('../views/luxe/index', { title: 'Home' });
// });
// router.get('/login', function(req, res, next) {
//   res.render('../views/luxe/login', { title: 'Login' });
// });
// router.get('/services', function(req, res, next) {
//   res.render('../views/luxe/services', { title: 'Services' });
// });
// router.get('/blog', function(req, res, next) {
//   res.render('../views/luxe/blog', { title: 'Blog' });
// });
// router.get('/contract', function(req, res, next) {
//   res.render('../views/luxe/contract', { title: 'Contract' });
// });
// router.get('/hotel', function(req, res, next) {
//   res.render('../views/luxe/hotel', { title: 'Hotel' });
// });
// router.get('/booking', function(req, res, next) {
//   res.render('../views/luxe/booking', { title: 'Booking' });
// });


var cust_info = null;//라우터가 처음 실행될 때 로그인 안된 상태를 표현


// chanwoong routing
>>>>>>> upstream/develop
router.get('/', function(req, res, next) {
  res.render('../views/chanwoong/index', { title: 'Home' , cust_info:cust_info});
});
router.get('/login', function(req, res, next) {
<<<<<<< HEAD
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
=======
  res.render('../views/chanwoong/login', { title: 'Login' , cust_info:cust_info});
});
router.get('/reservation', function(req, res, next) {
  res.render('../views/chanwoong/reservation', { title: 'Reservation', cust_info:cust_info,avail_roomtype:available_roomtypes});
});
router.get('/room', function(req, res, next) {
  res.render('../views/chanwoong/room', { title: 'Room' , cust_info:cust_info});
>>>>>>> upstream/develop
});
router.get('/register',function(req,res, next){
  res.render('../views/chanwoong/register',{title:'Register', cust_info:cust_info});
});

router.post('/register', function (req, res) {
  var korean_first = req.body.korean_first;
  var korean_last = req.body.korean_last;
  var english_first = req.body.english_first;
  var english_last = req.body.english_last;
  var phone_num = req.body.phone_num;
  var email = req.body.email;

  var password = req.body.password;

  var gender = req.body.gender;
  var birth = req.body.birth;
  var nation = req.body.nation;
  var add_city = req.body.add_city;
  var add_state = req.body.add_state;
  var zip = req.body.zip;
  var street = req.body.street;
  var apart_num = req.body.apart_num;
  var detail_address = req.body.detail_address;

  var sql1 = 'INSERT INTO address(ZIP_CODE, ADDRESS1, ADDRESS2, ADDRESS3, ADDRESS4, ADDRESS5) VALUES(?, ?, ?, ?, ?,?)';
  connection.query(sql1, [zip, add_city, add_state, street, apart_num, detail_address], function (error, rows, fields) {
    if (error) {
      console.log(error);
    } 
    var sql2 = 'INSERT INTO person(KOR_FIRST_NAME, KOR_LAST_NAME, ENG_FIRST_NAME, ENG_LAST_NAME, PHONE_NUM, EMAIL, ADDRESS_ID, GENDER, BIRTH, NATION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql2, [korean_first, korean_last, english_first, english_last, phone_num, email, rows.insertId, gender, birth, nation], function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      var sql3 = 'INSERT INTO customer(PERSON_ID, LOGIN_ID, LOGIN_PW) VALUES(?, ?, ?)';
      connection.query(sql3, [results.insertId, email, password], function (error, results, fields) {
        if (error) {
          console.log(error);
        }
        console.log(results);
      });
      console.log(results);
    });
    console.log(rows);
  });
  console.log("가입성공");
  res.render('../views/chanwoong/index', {title: 'Home' , cust_info:cust_info});
});



router.post('/main',function (req,res) {
  var userid = req.body.userid;
  var userpwd = req.body.userpwd;
  connection.query('SELECT * FROM customer natural join person WHERE login_id = ?', [userid], function (error, result, fields) {
    if (error) {
      console.log(error);
    }
    if (result.length == 0) {
      console.log("일치하는 아이디 없음");
<<<<<<< HEAD
      res.render('../views/login', {title: 'Login'});
=======
      res.render('../views/chanwoong/login', {title: 'Login', cust_info: cust_info});
>>>>>>> upstream/develop
    }
    else{
      for (var i = 0; i < result.length; i++) {
        if (result[i].login_pw == userpwd) {
          console.log("로그인 성공");
          cust_info = result[i];
          res.render('../views/chanwoong/index', {title: 'Home', cust_info: cust_info});
          break;
        } else {
          console.log("로그인 실패...");
          res.render('../views/chanwoong/login', {title: 'Login', cust_info: cust_info});
        }
      }
    }
  })
})


router.post('/search_room', function (req, res) {
    var room = Number(req.body.room);
    var date_arrival = req.body.datedpar;
    var date_departure = req.body.datearr;
    var adult_num = Number(req.body.adults);
    var child_num = Number(req.body.children);
    var baby_num = Number(req.body.babies);
    var people = adult_num + child_num + baby_num;
    var a="",b="",c="";
    var step =1;
    for(var i=0;i<date_arrival.length;i++){
      if(date_arrival[i] != '/'){
        if(step == 1) a += date_arrival[i];
        else if(step ==2) b+= date_arrival[i];
        else if(step ==3) c+= date_arrival[i];
      }
      else{
        step++;
      }
    }var date_arr=c+"-"+a+"-"+b+" 00:00:00";
    a="";b="";c="";step =1;
    for(var i=0;i<date_departure.length;i++){
      if(date_departure[i] != '/'){
        if(step == 1) a += date_departure[i];
        else if(step ==2) b+= date_departure[i];
        else if(step ==3) c+= date_departure[i];
      }
      else{
        step++;
      }
    }var date_dpa=c+"-"+a+"-"+b+" 00:00:00";

    var avail_types;

    var sql1 = 'select * from room_type';
    connection.query(sql1, function (error, result, fields) {
      if (error) {
        console.log(error);
      }
      var x = result;
      for(var i=result.length-1;i>=0;i--) {
        if(result[i].CAPACITY_MAX < people){
          x.splice(i,1);//인원수로 거른다
        }
      }
      avail_types = x;
    })
    var sql2 = 'SELECT count(reservation_id) as re,room_type FROM reservation natural join room_type where (CHECKIN_DATE BETWEEN '+connection.escape(date_dpa)+' AND '+connection.escape(date_arr)+') OR (CHECKOUT_DATE BETWEEN '+connection.escape(date_dpa)+' AND '+connection.escape(date_arr)+') group by room_type';
    connection.query(sql2, function (error, result, fields) {
      if (error) {
        console.log(error);
      }
      var myres = avail_types;
      var jmyres = JSON.parse(JSON.stringify(avail_types));//값 비교를 위함;
      if(room != 0){

        switch (room){
          case 1:for(var i =avail_types.length-1;i >=0;i--){
            if(!(jmyres[i].ROOM_TYPE  =="STANDARD_TWIN"||jmyres[i].ROOM_TYPE  =="STANDARD_DOUBLE"||jmyres[i].ROOM_TYPE  =="STANDARD_FAMILY")){
              myres.splice(i,1);
            }
          }break;
          case 2:for(var i =avail_types.length-1;i >=0;i--){
            if(!(jmyres[i].ROOM_TYPE  =="DELUXE_TWIN"||jmyres[i].ROOM_TYPE  =="DELUXE_DOUBLE"||jmyres[i].ROOM_TYPE  =="DELUXE_FAMILY")){
              myres.splice(i,1);
            }
          }break;
          case 3:for(var i =avail_types.length-1;i >=0;i--){
            if(!(jmyres[i].ROOM_TYPE  =="PREMIUM_TWIN"||jmyres[i].ROOM_TYPE  =="PREMIUM_DOUBLE")){
              myres.splice(i,1);
            }
          }break;
          case 4:for(var i =avail_types.length-1;i >=0;i--){
            if(jmyres[i].ROOM_TYPE  !="SUITE"){
              myres.splice(i,1);
            }
            // console.log(jmyres[i].ROOM_TYPE  !="SUITE");
            // console.log(myres.length);
          }break;
          case 5:for(var i =avail_types.length-1;i >=0;i--){
            if(jmyres[i].ROOM_TYPE != "EXCUTIVE_SUITE"){
              myres.splice(i,1);
            }
          }break;
        }
        console.log(JSON.stringify(myres));
        available_roomtypes = myres;
      }
      else {//방을 선택 안했기 때문에 간으한 모든 방을 보여줌
        for (var i = 0; i < avail_types.length; i++) {
          var index = -1;
          for (var x = 0; result.length > x; x++) {
            if (avail_types[i].room_type == result[x].room_type) {
              index = x;
            }
          }
          if (index > -1) {
            if (avail_types[i].OVERBOOK_COUNT <= result[index].re) {
              myres.splice(i, 1);
            }
          }
        }
        if (myres.length == 0) myres = null;
        available_roomtypes = myres;
      }
      res.render('../views/chanwoong/reservation', {
        title: 'Reservation',
        cust_info: cust_info,
        avail_roomtype: available_roomtypes
      });
    });

})


//INSERT INTO reservation VALUES (272, 271, 'EXECUTIVE_SUITE' ,null,'2000-1-1 00:00:00','2000-1-4 00:00:00',271,1,1,1,1);
// SELECT count(reservation_id) as re FROM reservation where (CHECKIN_DATE BETWEEN '1996-4-1 00:00:00' AND '2020-12-5 00:00:00') OR (CHECKOUT_DATE BETWEEN '1996-4-1 00:00:00' AND '2020-12-5 00:00:00') group by room_type;

module.exports = router;