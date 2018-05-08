'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('hakakses', {
    hakakses: DataTypes.STRING,
    ket_hakakses: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });
  Model.associate = function(models) {
    this.users = this.hasMany(models.user, {foreignKey: 'id_hakakses'});
  };
  return Model;
};