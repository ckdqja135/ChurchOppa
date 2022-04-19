const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');


// 라우팅 설정.
app.get('/', function(req, res){
    res.sendFile(__dirname + '/assets/html/index.html');
})

app.get('/church', function(req, res){
    res.sendFile(__dirname + '/assets/html/churchpage.html');
})

app.get('/Board', function(req, res){
    res.sendFile(__dirname + '/assets/html/Board.html');
})

// css파일을 가져오도록 설정.
app.use('/', express.static(__dirname + '/assets'));

// 404 처리 부분
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/assets/html/404ErrorPage.html');
});

// 에러 처리 부분
app.use((err, req, res) => {
    // 에러 메시지 표시
    console.error(err.stack);
    // 500 상태 표시 후 에러 메시지 전송
    res.status(500).sendFile(__dirname + '/assets/html/500ErrorPage.html');
});

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

// app.use(express.static('images'));
app.listen(3000, () => console.log('3000번 포트 대기'));