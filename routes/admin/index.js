var express = require('express');
var router = express.Router();
var knex = require('../../dbconnect');

/* GET home page. */
router.get('/', async function(req, res, next) {
  //if session is not set, redirect to login page
  if(!req.session.user){
    res.redirect('/admin/login');
  }else{
    //get user info from db
    console.log(req.session.user);
    var userData = await knex('users').where({UID: req.session.user.UID}).first();
    res.render('admin-index',{user: userData});
  }
  
});

//login get route
router.get('/login', function(req, res, next) {
  res.render('admin-login');
});

//login post route
router.post('/login', async function(req, res, next) {
  //get username and password from request
  var badge = req.body.badge;
  var pin = req.body.pin;
  //check if username and password are not empty
  if(badge && pin){
    //get user info from db
    var userData = await knex('users').where({UID: badge, pin: pin}).first();
    //if user exists
    if(userData){
      //set session user data
      req.session.user = userData;
      //redirect to home page
      res.redirect('/admin');
    }else{
      //if user does not exist
      res.render('admin-login', {error: 'Invalid username or password'});
    }
  }else{
    //if username or password is empty
    res.render('admin-login', {error: 'Please enter username and password'});
  }
});


module.exports = router;
