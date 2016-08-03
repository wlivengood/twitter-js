module.exports = function (io) { 
  var express = require('express');
  var router = express.Router();
  var tweetBank = require('../tweetBank');
  var bodyParser = require('body-parser');

  router.use(bodyParser());

  router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm: true, autoPopName: name} );
  });

  router.get('/tweets/:id', function(req, res) {
    var id = Number(req.params.id);
    var tweet = tweetBank.find( {id: id});
    res.render( 'index', { title: 'Twitter.js - Post #'+id, tweets: tweet } );
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var content = req.body.content;
    tweetBank.add(name, content);
    io.sockets.emit('newTweet', {name: name, content: content});
    res.redirect('/');
  });
  return router;
};
