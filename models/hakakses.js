'use strict';
module.exports = (sequelize, DataTypes) => {
  var Hakakses = sequelize.define('Hakakses', {
    hakakses: DataTypes.STRING,
    ket: DataTypes.STRING
  }, {});
  Hakakses.associate = function(models) {
    // associations can be defined here
    Hakakses.hasMany(models.User, {
      foreignKey: 'id_peg',
      onDelete: 'CASCADE'
    });
  };

  // Model.prototype.toWeb = function (pw) {
  //   let json = this.toJSON();
  //   return json;
  // };

  return Hakakses;
};