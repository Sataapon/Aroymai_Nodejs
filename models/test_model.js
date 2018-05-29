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

/*
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
});
*/

/*
Menu.findAll( { include : [CommentScore] } ).then(menus => {
  console.log("------");
  console.log(menus[0].CommentScores);
  console.log("------");
  console.log(JSON.stringify(menus));
  console.log("------");
  console.log(menus);
});
*/
