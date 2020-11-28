var mysql      = require('mysql');

// 재우꺼 디비 서버
var db_config = {
  host     : '110.13.222.97',
  port     : '13333',
  user     : 'son',
  password : '1234',
  database : 'son'
};

// 해로쿠 디비 서버
// var db_config = {
//     host : "us-cdbr-east-02.cleardb.com",
//     port : "3306",
//     user: "b0d7db5a46255f",
//     password: "e0ba2ce1",
//     database : "heroku_a9f9515c41ce864"
// };

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

  module.exports = connection;