var express = require('express');
var chalk = require ('chalk');
var swig = require('swig');

var app = express();

app.engine('html', swig.renderFile);
app.set("view engine", "html");
app.set("views", __dirname + '/views');
swig.setDefaults({ cache: false });



app.use(function(req, res, next) {
	console.log(chalk.red(req.method) + ' ' + chalk.blue(req.path) + ' ' + chalk.green(res.statusCode));
	next();
});

app.use("/special/",function(req, res, next) {
	res.send("Aren't you special?");
	next();
});

app.get("/", function(req, res) {
	var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	res.render( 'index', {title: 'Hall of Fame', people: people} );
});

app.get("/news", function(req, res) {
	res.send("Here's the news");
});

app.listen(3000, function() {
	console.log("server listening");
});