var express = require('express');
var router = express.Router();
var connection = require('./db');

var available_roomtypes = null;
var input_info = null;

router.get('/', function(req, res, next) {
  if(!req.cookies['customer_id']){
    res.render('../views/chanwoong/reservation', { title: 'Reservation', cust_info:null, avail_roomtype:available_roomtypes,reservation_info:input_info});
  } else {
    res.render('../views/chanwoong/reservation', { title: 'Reservation', cust_info:req.cookies['customer_id'], avail_roomtype:available_roomtypes,reservation_info:input_info});
  }
    
});

router.post('/', function (req, res) {
    var room = Number(req.body.room);
    var date_arrival = req.body.datearr;
    var date_departure = req.body.datedpar;
    var adult_num = Number(req.body.adults);
    var child_num = Number(req.body.children);
    var baby_num = Number(req.body.babies);
    var people = adult_num + child_num + baby_num;

    res.cookie('checkin_date',date_arrival);
    res.cookie('checkout_date',date_departure);
    res.cookie('adult_num',adult_num);
    res.cookie('child_num',child_num);
    res.cookie('baby_num',baby_num);
    
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
    }var date_arr=c+"-"+b+"-"+a+" 00:00:00";
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
    }var date_dpa=c+"-"+b+"-"+a+" 00:00:00";
  
    var avail_types;
    input_info = {"ROOMTYPE" : room,"DATE_ARR" : date_arr,"DATE_DPAR" : date_dpa,"N_A" : adult_num,"N_C" : child_num,"N_B" : baby_num};
  
    var sql1 = 'select * from ROOM_TYPE';
    connection.query(sql1, function (error, result, fields) {
      if (error) {
        console.log("여기는 왔냐?");
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
    var sql2 = 'SELECT count(reservation_id) as re,room_type FROM RESERVATION natural join ROOM_TYPE where (CHECKIN_DATE BETWEEN '+connection.escape(date_dpa)+' AND '+connection.escape(date_arr)+') OR (CHECKOUT_DATE BETWEEN '+connection.escape(date_dpa)+' AND '+connection.escape(date_arr)+') group by room_type';
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
        if (myres.length == 0) myres = null;
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
      
      if(!req.cookies['customer_id']){
        res.render('../views/chanwoong/reservation', {
          title: 'Reservation',
          cust_info: null,
          avail_roomtype: available_roomtypes,
          reservation_info: input_info
        });
      } else {
        res.render('../views/chanwoong/reservation', {
          title: 'Reservation',
          cust_info: req.cookies['customer_id'],
          avail_roomtype: available_roomtypes,
          reservation_info: input_info
        });
      }
    });
});
  

module.exports = router;