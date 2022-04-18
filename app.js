const express = require('express');
const app = express();
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
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/assets/html/ErrorPage.html');
});

// 에러 처리 부분
app.use((err, req, res, next) => {
    // 에러 메시지 표시
    console.error(err.stack);
    // 500 상태 표시 후 에러 메시지 전송
    res.status(500).send('서버 에러!'); 
});


// app.use(express.static('images'));
app.listen(3000, () => console.log('3000번 포트 대기'));