var express = require('express');
var chalk = require ('chalk');
var swig = require('swig');
var app = express();
var socketio = require('socket.io');

app.engine('html', swig.renderFile);
app.set("view engine", "html");
app.set("views", __dirname + '/views');
swig.setDefaults({ cache: false });

var routes = require('./routes/');

app.use(express.static('public'));

app.use(function(req, res, next) {
	console.log(chalk.red(req.method) + ' ' + chalk.blue(req.path) + ' ' + chalk.green(res.statusCode));
	next();
});

var server = app.listen(3000);
var io = socketio.listen(server);

app.use( '/', routes(io) );