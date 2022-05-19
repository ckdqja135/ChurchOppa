var express = require("express");
var router = express.Router();

var device = require("express-device");
router.use(device.capture());

/* GET home page. */
router.post("/", function (req, res, next) {
//     var db_service = require("../services/db_services");
//     // 마지막 function 이름 경로 수동 파싱. 시맨틱 사용법이 뭔가... 와닿지 않음
//     var func_name = req.baseUrl.substring(req.baseUrl.lastIndexOf("/") + 1);

//     var out_func = function (error, result) {
//     if (error) {
//         // do something...
//     }

//     if (func_name == "inquiry") {
//         var responseData = { result: "ok" };
//         res.json(responseData);
//         return;
//     }

//         res.json(result);
//     };

//     if (func_name == "faq") {
//             db_service.get_faq_list(
//                 out_func,
//                 req.body.page,
//                 req.body.rows,
//                 req.body.category
//         );
//     }
// });
module.exports = router;
