var socketAPI = {};
var socket_io = require('socket.io');
var io = socket_io();
var connection = require('../db_webserver/routes/db');


io.on('connection', function (socket){
    // socket.on('addcomplain',function (data){
    //     io.emit('addcomplain',data.complaintext);
    // });
    socket.on('addcomplain',function (data){
        var roomnum=data.roomnum;
        var description=data.contentx;
        var employee_id = data.employee_id;
        var TYPE = data.complain_type;
        var start_time = data.st_time;
        var fin_time = data.fin_time;
        var priorityx = data.priorityx;

        //INSERT INTO COMPLAIN(ROOM_NUM,DESCRIPTION,EMPLOYEE_ID,TYPE,START_TIME,FIN_TIME,PRIORITY) VALUES(201,"it just test",null,'COMPLAIN',"2000-11-11 00:00:00",null,1);
        var sql = "INSERT INTO COMPLAIN(ROOM_NUM,DESCRIPTION,EMPLOYEE_ID,TYPE,START_TIME,FIN_TIME,PRIORITY) VALUES(?, ?, ?, ?, ?,?,?)";
        connection.query(sql,[roomnum,description,employee_id,TYPE,start_time,fin_time,priorityx], function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        io.emit('addcomplain',data);
    });
});







socketAPI.io = io;
module.exports = socketAPI;