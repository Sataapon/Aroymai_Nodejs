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

var menus = [{name: 'Gangcurry', type: 'Food'},
             {name: 'Gangsom', type: 'Food'},
             {name: 'Keghuay', type: 'Drink'},
             {name: 'Namoi', type: 'Drink'}
            ];

sequelize.sync()
  .then(() => Menu.bulkCreate(menus))
    .then(menus => {
      console.log("Create menu as number ", menus.length);
  });
