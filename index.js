var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

/****** define models ******/
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: './database.sqlite'
});

var Menu = sequelize.define('Menu', {
  name: Sequelize.STRING,
  Type: Sequelize.STRING
});

var User = sequelize.define('User', {
  name: Sequelize.STRING
});

var CommentScore = sequelize.define('CommentScore', {
  comment: Sequelize.TEXT,
  score: Sequelize.INTEGER
});

Menu.hasMany(CommentScore);
User.hasMany(CommentScore);
/***************************/

app.get('/', function (req, res){
  Menu.findAll().then(menus => {
    var foods = {};
    var drinks = {};
    for (var i in menus) {
      if (menus[i].Type == 'Food') {
        foods[menus[i].name] = menus[i].Type;
      }
      else if (menus[i].Type == 'Drink') {
        drinks[menus[i].name] = menus[i].Type;
      }
    }
    res.render('home', {
      'foods': foods,
      'drinks': drinks
    });
  });
});

app.get('/fill', function(req, res){
  var foods = [];
  var drinks = [];
  for (var key in req.query){
    if (key[0] == 'F'){
      foods.push(req.query[key]);
    }
    else{
      drinks.push(req.query[key]);
    }
  }
  res.render('fill', {
    'foods': foods,
    'drinks': drinks
  });
});

app.post('/add', function(req, res){
  var user;
  if (req.body['User'] == '') {
    user = 'Noname';
  }
  else {
    user = req.body['User'];
  }
  sequelize.sync()
    .then(() => User.create({ name: user }))
      .then(user => {
        console.log('Create user as name', user.dataValues.name);
        for (var key in req.body){
          if (key != 'User') {
            var type_key = key.split('_');
            console.log(type_key);
            Menu.findOne({ where: {name: type_key[0]} }).then(menu => {
              console.log(type_key[1], menu.dataValues.name);
            });
          }
        }
      });

  res.redirect('/');
});

app.get('/review', function(req, res){
  res.send(req.body);
});

app.get('/about', function(req, res){
  res.sendfile('public/htmls/about.html');
});

app.listen(3000);

module.exports = app;
