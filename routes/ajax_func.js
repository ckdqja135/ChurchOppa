var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var db_service = require('../services/db_services');
  // 마지막 function 이름 경로 수동 파싱. 시맨틱 사용법이 뭔가... 와닿지 않음
  var func_name = req.baseUrl.substring(req.baseUrl.lastIndexOf("/") + 1);
  console.log("func_name", func_name)
  var out_func = function (error, result) {
    if (error) {
      // do something...
      console.log("error", error);
    }

    res.json(result);
    console.log("result", result)
  };
  
  if (func_name == 'search') {
    console.log("hi", req.body.church_name)
    db_service.search_church(out_func, req.body.church_name);
  }
  else if (func_name == 'auto') {
    console.log("hi", req.body.keyword)
    db_service.auto_search_church(out_func, req.body.keyword);
  }
  else {
    res.json(null);
  } 
});
module.exports = router;


