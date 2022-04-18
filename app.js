const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname + '/assets/html/index.html');
})

app.get('/church', function(req, res){
    res.sendFile(__dirname + '/assets/html/churchpage.html');
})

app.use('/', express.static(__dirname + '/assets'));
// app.use(express.static('images'));
app.listen(3000, () => console.log('3000번 포트 대기'));