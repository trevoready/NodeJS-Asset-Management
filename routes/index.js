var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //redirect to admin page for now
  res.redirect('/admin');
});

module.exports = router;
