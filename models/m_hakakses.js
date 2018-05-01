'use strict';
module.exports = (sequelize, DataTypes) => {
  var m_hakakses = sequelize.define('m_hakakses', {
    hakakses: DataTypes.STRING,
    ket_hakakses: DataTypes.STRING
  }, {});
  m_hakakses.associate = function(models) {
    this.Users = this.hasMany(models.User, {foreignKey: 'id_hakakses'});
  };
  return m_hakakses;
};