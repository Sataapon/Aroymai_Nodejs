var express = require('express')
var app = express();

app.set('view engine', 'ejs')

app.get('/', function(req, res){
  res.render('index')
});

app.post('/fill', function(req, res){
  res.send("Fill page get post request");
});

app.post('/review', function(req, res){
  res.send("Review page get post request");
});

app.listen(3000);
