var express = require('express');
var router = express.Router();
var connection = require('./db');

router.get('/', function(req, res, next) {  
    var room_type = req.param('room_type');
    var checkin_date = req.cookies.checkin_date;
    var checkout_date = req.cookies.checkout_date;
    var adult_num = parseInt(req.cookies.adult_num);
    var child_num = parseInt(req.cookies.child_num);
    var baby_num = parseInt(req.cookies.baby_num);
    
    console.log("room_type " + room_type );

    var reserv_info = [checkin_date,checkout_date,adult_num,child_num,baby_num];
    connection.query("select * from ROOM_TYPE where room_type = ?",[room_type],function(error,results){
        if(error){
            console.log("쿼리에러");
        }else{

            var room = JSON.parse(JSON.stringify(results[0]));
            if(!req.cookies['customer_id']){
                res.render('../views/chanwoong/booking', { title: 'Booking' , cust_info:null, reserv_info:reserv_info, room_info: room});
            } else {
                var sql = 'select * from CUSTOMER natural join PERSON where customer_id = ?'
                connection.query(sql,req.cookies['customer_id'],function(error, rows){
                    if(error) {
                        console.log("쿼리문제");
                    } else{
                        var sqlres = JSON.parse(JSON.stringify(rows[0]));
                        res.render('../views/chanwoong/booking', { title: 'Booking' , cust_info:sqlres, reserv_info:reserv_info, room_info:room});
                    }
                });
            }
        }
    });
});


router.post('/',function(req,res,next) {
    var checkin_date = req.cookies.checkin_date;
    var checkout_date = req.cookies.checkout_date;
    var adult_num = parseInt(req.cookies.adult_num);
    var child_num = parseInt(req.cookies.child_num);
    var baby_num = parseInt(req.cookies.baby_num);

    var reserv_info = [checkin_date,checkout_date,adult_num,child_num,baby_num];

    var room_type = req.body.room_type; 
    var room_price = req.body.room_price;


    var card_company = req.body.cardtype;
    var card_valid = req.body.month + "/" + req.body.year;
    var card_cvc = req.body.cvc;
    var card_num = req.body.credit1 + "-" + req.body.credit2 + "-" + req.body.credit3 + "-" + req.body.credit4;
    var extra_fee = parseInt(req.body.adult_alp) * (room_price/5) + parseInt(req.body.child_alp) * (room_price/10);
    var breakfast_count = Number(req.body.breakfast);

    var checkin_date = reserv_info[0];
    var checkout_date = reserv_info[1];

    
    //기태야 고맙다
    var a="",b="",c='';
    var step =1;
    for(var i=0;i<checkin_date.length;i++){
      if(checkin_date[i] != '/'){
        if(step == 1) a += checkin_date[i];
        else if(step ==2) b+= checkin_date[i];
        else if(step ==3) c+= checkin_date[i];
      }
      else{
        step++;
      }
    }
    
    var checkin_date=c+"-"+b+"-"+a+' 00:00:00';
    a="";b="";c="";step =1;
    for(var i=0;i<checkout_date.length;i++){
      if(checkout_date[i] != '/'){
        if(step == 1) a += checkout_date[i];
        else if(step ==2) b+= checkout_date[i];
        else if(step ==3) c+= checkout_date[i];
      }
      else{
        step++;
      }
    }var checkout_date=c+"-"+b+"-"+a+' 00:00:00';
    //정말루



    
    var sql_card = "insert into CARD values(?,?,?,?,?)";

    var sql_reservation = "insert into RESERVATION values(?,?,?,?,?,?,?,?,?,?,?)";
    var sql_detail_fee = "insert into DETAIL_FEE values(?,?,?,?)";

    if(!req.cookies['customer_id']){
        var kor_first_name = req.body.korean_first;
        var kor_last_name = req.body.korean_last;
        var eng_first_name = req.body.english_first;
        var eng_last_name = req.body.english_last;
        var email = req.body.email;
        var phone_num = req.body.phone_num;
        var gender = req.body.gender;
        var birth = req.body.birth;
        var sql1 = 'insert into PERSON values(?,?,?,?,?,?,?,?,?,?,?)';
        connection.query(sql1,[null,kor_first_name,kor_last_name,eng_first_name,eng_last_name,phone_num,email,null,gender,birth,null],function(error,results){
            if(error){
                console.log("쿼리터짐");
            } else {
                var sql2 = 'insert into CUSTOMER values(?,?,?,?,?)';
                connection.query(sql2,[null,results.insertId,null,email,'1234'],function(error,rows){
                    if(error){
                        console.log("여기는 안뜨겠지 뭐");
                    }else {
                        connection.query(sql_card,[null,card_num,card_company,card_cvc,card_valid],function(error,result1){
                            if(error){
                                console.log("쿼리야쿼리");
                            }else{
                                connection.query(sql_reservation,[null,rows.insertId,room_type,null,checkin_date,checkout_date,result1.insertId, Number(reserv_info[2]),Number(reserv_info[3]),Number(reserv_info[4]),Number(breakfast_count)],function(error,result2){
                                    if(error){
                                        console.log("reservation query problemm");
                                    }else{
                                        connection.query(sql_detail_fee,[result2.insertId,room_price,extra_fee,extra_fee + room_price],function(error,result3){
                                            if(error){
                                                console.log("마지막에 와서 지랄이네");
                                            }else{
                                                res.clearCookie('checkin_date');
                                                res.clearCookie('checkout_date');
                                                res.clearCookie('adult_num');
                                                res.clearCookie('child_num');
                                                res.clearCookie('baby_num');
                                                res.redirect('/');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }   
                });
            }
        });
    }else {
        connection.query(sql_card,[null,card_num,card_company,card_cvc,card_valid],function(error,result1){
            if(error){
                console.log("쿼리야쿼리");
            }else{
                var array = [null,parseInt(req.cookies['customer_id']),room_type,null,checkin_date,checkout_date,result1.insertId,reserv_info[2],reserv_info[3],reserv_info[4],breakfast_count];
                console.log(array);
                console.log(checkin_date);
                connection.query(sql_reservation,array,function(error,result2){
                    if(error){
                        console.log("reservation query problemm");
                        console.log(error);
                    }else{
                        console.log("여기여기");
                        connection.query(sql_detail_fee,[result2.insertId,room_price,extra_fee,extra_fee + room_price],function(error,result3){
                            if(error){
                                console.log("마지막에 와서 지랄이네");
                                console.log(error);
                            }else{
                                res.clearCookie('checkin_date');
                                res.clearCookie('checkout_date');
                                res.clearCookie('adult_num');
                                res.clearCookie('child_num');
                                res.clearCookie('baby_num');

                                res.redirect('/');
                            }
                        });
                    }
                });
            }
        });
    }
});


module.exports = router;