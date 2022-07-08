var createError = require('http-errors');
const helmet = require('helmet');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

// dbconneciton 
// var db_connector = require('./conf/db_conn');
// console.log(db_connector);
// var dbc = db_connector.init(); // db connection
// db_connector.test_open(dbc);



var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'assets'));
app.set('view engine', 'ejs');


app.use(logger('dev'));

// log 기록하기
app.use(
  logger('common', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' }) 
		// flags : a => 로그를 계속 덧붙인다
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.get('/search=?', function(req, res) {
//   let sql = 'select * from churchinfo where ChurchName = ?';
//   let params = req.query.name;

//   dbc.query(sql , params, function(err, row, fields){//row => 결과값
//       if(err){
//           console.log(err);
//       }

//       if(row.length > 0) {
//           // res.json({ok: true, churchname: row})
//           res.render('churchpage.ejs', {church : row});
//           console.log("hey!!!!", row)
//       } else {
//           res.sendFile(__dirname + '/assets/html/resultNotfound.html');
//       }
//   });
// })


// use routes
// pc, mobile 라우팅. routes 파일에서 device별 렌더링.
app.use('/', require('./routes/index'));
app.use('/search=?', require('./routes/chuchpage'));
app.use('/ajax/:func', require('./routes/ajax_func'));
app.use('/board', require('./routes/board'));
// app.use('/upload', require('./routes/upload'));
// app.use('/:lang/users', require('./routes/users'));
// app.use('/:lang/careers', require('./routes/careers'));
// app.use('/:lang/openVacancies', require('./routes/openVacancies'));
// app.use('/:lang/openVacanciesDetail', require('./routes/openVacanciesDetail'));
// app.use('/:lang/policy', require('./routes/policy'));
// app.use('/:lang/policy_kr', require('./routes/policy_kr'));
// app.use('/:lang/ip', require('./routes/ip'));
// app.use('/:lang/apply', require('./routes/apply'));

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
// app.get('/Board', function(req, res){
//   res.render('Board.ejs');
// })

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


module.exports = app;
