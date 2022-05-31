var express = require('express');
var router = express.Router();

var device = require('express-device');
router.use(device.capture());

/* GET home page. */
router.get('/', function(req, res, next) {
  var db_service = require('../services/db_services');

  var out_func = function (error, result) {
    if (error) {
      // do something...
    }

    if(req.device.type == 'desktop') {
      res.render('pc/en/contact', { title: 'Contact us', country: result });
    } else {
      res.render('mobile/en/contact', { title: 'Contact type in', country: result });
    }
  };

  db_service.get_country_all(out_func);
});




module.exports = router;
