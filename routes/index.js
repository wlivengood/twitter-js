var express = require('express');
var router = express.Router();

var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

// router.get('/stylesheets/style.css', function (req, res) {
// 	res.sendFile('public/stylesheets/style.css');
// })

module.exports = router;