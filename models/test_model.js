var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: './database.sqlite'
});

var Menu = sequelize.define('Menu', {
  name: Sequelize.STRING,
  type: Sequelize.STRING
});

var User = sequelize.define('User', {
  comment: Sequelize.TEXT,
  score: Sequelize.INTEGER
});

Menu.hasMany(User);

Menu.findAll( { include : [User] } ).then(menus => {
  console.log("------");
  console.log(menus[0].Users[0].comment);
  console.log("------");
  console.log(JSON.stringify(menus));
  console.log("------");
  console.log(menus);
  console.log("------");
});
