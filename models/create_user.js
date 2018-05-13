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

var users = [{comment: 'comment1', score: 'score1', MenuId: 1},
             {comment: 'comment2', score: 'score2', MenuId: 1},
             {comment: 'comment3', score: 'score3', MenuId: 1}
            ];

sequelize.sync()
  .then(() => User.bulkCreate(users))
    .then(users => {
      console.log("Create user of Gangcurry as number ", users.length);
  });
