var express = require('express');
var router = express.Router();

var device = require('express-device');
router.use(device.capture());

var multer = require("multer");
// import {diskRootPath,diskFaqPath,diskCompanyPath,diskJobAppPath}  from '../../config/Const'
const MaxTextSize = 1024 * 1024 * 16 ;
const diskRootPath = '/data/contents';
const diskFaqPath = '/faq';
const diskCompanyPath = '/company';
const diskJobAppPath = '/jobApp';

const uploadDisk = multer({dest: diskRootPath+diskFaqPath }).array("files");
const uploadDiskJobApp = multer({dest: diskRootPath+diskJobAppPath }).single("upload_file");
// const upload = multer().array("files");
const uploadSingle = multer({ }).single("file");

/* GET home page. */
router.get('/', function(req, res, next) {
  var db_service = require('../services/db_services');
  console.log(req.device.type);
  console.log(req.headers);

  var out_func = function (error, result) {
    if (error) {
      // do something...
    }

    if(req.device.type == 'desktop') {
      res.render('pc/en/apply', { title: 'Apply', country: result });
    } 
    else {
      res.render('pc/en/apply', { title: 'Mysoftwiz', country: result });
    }
  };

  db_service.get_country_all(out_func);



// if(req.device.type == 'desktop') {
//   res.render('pc/en/apply', { title: 'Apply' });
// } 
//   else {
//     res.render('mobile/en/option', { title: 'BABA option' });
//   }
});

router.post('/', function(req, res) {
  if(req.device.type == 'desktop') {
    res.render('pc/en/apply', { title: 'Apply', data : req.body });
  } else {
    res.render('pc/en/apply', { title: 'Apply', data : req.body });
  }
});



module.exports = router;
