'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('m_hakakses', {
    id_hakakses: {
        type: DataTypes.TINYINT(2),
        allowNull: false
    },
    hakakses: DataTypes.STRING,
    ket_hakakses: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  Model.associate = function(models) {
    this.users = this.hasMany(models.user, {foreignKey: 'UserHakakses', sourceKey: 'id_hakakses'});
  };
  return Model;
};