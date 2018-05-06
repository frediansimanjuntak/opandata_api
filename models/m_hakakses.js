'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('m_hakakses', {
    id_hakaskses: {
        type: DataTypes.TINYINT(2),
        primaryKey: true,
    },
    hakakses: DataTypes.STRING,
    ket_hakakses: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });
  Model.associate = function(models) {
    // this.users = this.hasMany(models.user, {foreignKey: 'id_hakaskses'});
  };
  return Model;
};