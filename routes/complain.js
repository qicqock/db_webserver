var express = require('express');
var router = express.Router();
var connection = require('./db');


router.get('/', function(req, res, next) {
    var sql = "SELECT * FROM COMPLAIN AS C LEFT JOIN EMPLOYEE AS E ON C.EMPLOYEE_ID=E.EMPLOYEE_ID LEFT JOIN PERSON AS P ON P.PERSON_ID=E.PERSON_ID";
    connection.query(sql, function (error, result, fields) {
        if (error) {
            console.log(error);
        }
        var fucking = JSON.parse(JSON.stringify(result));
        res.render('../views/chanwoong/complain', { title: 'Complain' , cust_info:null,complain:fucking});
    });
});

// `COMPLAIN_ID`           INT         NOT NULL    AUTO_INCREMENT COMMENT '민원ID',
//     `ROOM_NUM`     INT         NOT NULL    COMMENT '객실번호',
//     `DESCRIPTION`  TEXT        NOT NULL    COMMENT '내용',
//     `EMPLOYEE_ID`     INT         NULL        COMMENT '직원ID',
//     `TYPE`         ENUM('AMENITY','COMPLAIN','PRIMARY')        NOT NULL    COMMENT '민원타입',
//     `START_TIME`   DATETIME    NOT NULL    COMMENT '민원발생시간',
//     `FIN_TIME`     DATETIME    NULL        COMMENT '민원종료시간',
//     `PRIORITY`     INT        NOT NULL     COMMENT '우선순위',



module.exports = router;