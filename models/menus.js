'use strict';
module.exports = (sequelize, DataTypes) => {
  var Menus = sequelize.define('Menus', {
    Name: DataTypes.STRING,
    Type: DataTypes.STRING
  }, {});
  Menus.associate = function(models) {
    // associations can be defined here
    Menus.hasMany(models.Users)
  };
  return Menus;
};
