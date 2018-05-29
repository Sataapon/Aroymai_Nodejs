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

var menus = [{name: 'Gangcurry', Type: 'Food'},
             {name: 'Gangsom', Type: 'Food'},
             {name: 'Kaopud', Type: 'Food'},
             {name: 'Keghuay', Type: 'Drink'},
             {name: 'Namoi', Type: 'Drink'},
             {name: 'Namsom', Type: 'Drink'}
            ];

sequelize.sync()
  .then(() => Menu.bulkCreate(menus))
    .then(menus => {
      console.log("Create menu as number ", menus.length);
  });
