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


var commentscores = [{comment: 'comment1', score: 'score1', MenuId: 1},
                     {comment: 'comment2', score: 'score2', MenuId: 1},
                    {comment: 'comment3', score: 'score3', MenuId: 1}
                    ];

sequelize.sync()
  .then(() => CommentScore.bulkCreate(commentscores))
    .then(commentscores => {
      console.log("Create user of Gangcurry as number ", commentscores.length);
  });
