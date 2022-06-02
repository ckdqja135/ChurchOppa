var express = require('express');
var router = express.Router();

var device = require('express-device');
router.use(device.capture());

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.device.type == 'desktop') {
    res.render('pc/en/about', { title: 'About BABA' });
  } else {
    res.render('mobile/en/about', { title: 'About BABA' });
  }
});

module.exports = router;


