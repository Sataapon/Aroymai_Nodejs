'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    Comment: DataTypes.STRING,
    Score: DataTypes.INTEGER
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.belongsTo(models.Menus)
  };
  return Users;
};
