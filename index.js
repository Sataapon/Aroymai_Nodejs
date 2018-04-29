var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine', 'ejs');

app.get('/', function (req, res){
  res.render('home');
});

app.post('/fill', function(req, res){
  var foods = {};
  var drinks = {};
  for (var key in req.body){
    if (key[0] == 'F'){
      foods[key] = req.body[key];
    }
    else{
      drinks[key] = req.body[key];
    }
  }
  res.render('fill', {
    foods: foods,
    drinks: drinks
  });
});

app.post('/add', function(req, res){
  res.send("add page get post request");
});

app.post('/review', function(req, res){
  res.send(req.body);
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('*', function(req, res){
  res.status(404).send('Sorry, this is an invalid URL.');
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = app;
