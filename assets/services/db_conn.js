const mysql = require('mysql');

var connection_info = {
// mysql 접속 설정
    init: function() {
        config = require('./db_info').my;
        return mysql.createConnection({ 
            host     : config.host,
            port     : config.port,
            user     : config.user,
            password : config.password,
            database : config.database
        });
    },
    // mysql 접속 여부
    test_open: function (conn) {
        conn.connect(function(err) {  
            if(!err) {  
                console.log("Database is connected ... \n\n");
            } else {  
                console.log("Error connecting database ... \n\n", err);
            }
        });
    }
}

module.exports = connection_info;