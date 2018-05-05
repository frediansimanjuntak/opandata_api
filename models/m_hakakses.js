'use strict';
module.exports = (sequelize, DataTypes) => {
  var m_hakakses = sequelize.define('m_hakakses', {
    hakakses: DataTypes.STRING,
    ket_hakakses: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  m_hakakses.associate = function(models) {
    this.users = this.hasMany(models.user, {foreignKey: 'id_hakakses'});
  };
  return m_hakakses;
};