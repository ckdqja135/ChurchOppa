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
    // console.log("result", result)
  };
  
  if (func_name == 'search') {
    db_service.search_church(out_func, req.body.church_name);
  }
  else if (func_name == 'auto') {
    db_service.auto_search_church(out_func, req.body.keyword);
  }  else if (func_name == 'inquiry_board') {
    console.log("zzzzz", req.body)
    db_service.inquiry_board(out_func, req.body)
    // db_service.search_church(out_func, "새지음교회");
  } else if (func_name == 'create_board') {
    console.log("zzzzz", req.body)
    db_service.create_board(out_func, req.body)
    // db_service.search_church(out_func, "새지음교회");
  }
  else {
    res.json(null);
  } 
});
module.exports = router;


