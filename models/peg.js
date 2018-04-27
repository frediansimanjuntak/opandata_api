'use strict';
module.exports = (sequelize, DataTypes) => {
  var Peg = sequelize.define('Peg', {
    nama: DataTypes.STRING,
    gelar_depan: DataTypes.STRING,
    gelar_belakang: DataTypes.STRING
  }, {});
  Peg.associate = function(models) {
    // associations can be defined here
    Peg.hasMany(models.User, {
      foreignKey: 'id_peg',
      onDelete: 'CASCADE'
    });
  };

  // Model.prototype.toWeb = function (pw) {
  //   let json = this.toJSON();
  //   return json;
  // };

  return Peg;
};
