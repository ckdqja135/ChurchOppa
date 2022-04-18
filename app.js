const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/assets/html/index.html');
})
app.use('/', express.static(__dirname + '/assets'));
// app.use(express.static('images'));
app.listen(3000, () => console.log('3000번 포트 대기'));