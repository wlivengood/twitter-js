var express = require('express');
var chalk = require ('chalk');

var app = express();

app.use(function(req, res, next) {
	console.log(chalk.red(req.method) + ' ' + chalk.blue(req.path) + ' ' + chalk.green(res.statusCode));
	next();
});

app.use("/special/",function(req, res, next) {
	res.send("Aren't you special?");
	next();
});

app.get("/", function(req, res) {
	res.send("Welcome!");
});

app.get("/news", function(req, res) {
	res.send("Here's the news");
});

app.listen(3000, function() {
	console.log("server listening");
});