const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const mysql = require('mysql');
const ejs = require("ejs");
const { stringify } = require('querystring');


// mysql 접속 설정
const conn =  mysql.createConnection({ 
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '123456',
    database : 'ChurchOppa'
});
// mysql 접속 여부
conn.connect(function(err){  
    if(!err) {  
        console.log("Database is connected ... \n\n");
    } else {  
        console.log("Error connecting database ... \n\n", err);
    }  
});
app.set('views', __dirname + '/assets/html');
app.set('view engine', 'ejs');


// var query = sanitize(url.parse(request.url, true).query.query);

// 라우팅 설정.
app.get('/', function(req, res){
    res.render('index.ejs');
})

app.get('/search=?', function(req, res) {
    let sql = 'select * from churchinfo where ChurchName = ?';
    let params = req.query.name;

    conn.query(sql , params, function(err, row, fields){//row => 결과값
        if(err){
            console.log(err);
        }

        if(row.length > 0) {
            // res.json({ok: true, churchname: row})
            res.render('churchpage.ejs', {church : row});
            console.log("hey!!!!", req)
        } else {

        }
    });
})

// app.get('/church', function(req, res){

//     let sql = 'select * from churchinfo';
//     conn.query(sql, function(err, row, fields){//row => 결과값
//         if(err){
//             console.log(err);
//         } else {
//             res.render('churchpage.ejs', {church : row});
//             console.log(row)
//         }
//     });
// });



app.get('/Board', function(req, res){
    res.render('Board.ejs');
})

// css파일을 가져오도록 설정.
app.use('/', express.static(__dirname + '/assets'));

// 404 처리 부분
app.use(function(req, res) {
    res.status(404).sendFile(__dirname + '/assets/html/404ErrorPage.html');
});

// 에러 처리 부분
app.use(function(err, req, res) {
    // 에러 메시지 표시
    console.error(err.stack);
    // 500 상태 표시 후 에러 메시지 전송
    res.status(500).sendFile(__dirname + '/assets/html/500ErrorPage.html');
});

// //....
// app.use(helmet.hsts({
//     maxAge: ms("1 year"),
//     includeSubdomains: true
// }));

// security 처리
// helmet -> Header 설정 바꿔주는 Module.
app.use(helmet());
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.disable('x-powered-by');
// CORS 처리.
app.use(cors());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
//     next();
// });

// app.use(express.static('images'));
app.listen(3000, () => console.log('3000번 포트 대기'));