'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('m_opd', {
    nama_opd: DataTypes.STRING,
    akronim_opd: DataTypes.STRING,
    kepala_opd: DataTypes.STRING,
    telp: DataTypes.STRING,
    fax: DataTypes.STRING,
    alamat: DataTypes.STRING,
    alamat_kel: DataTypes.STRING,
    email: DataTypes.STRING,
    link: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  Model.associate = function(models) {
    // associations can be defined here
    this.forms = this.hasMany(models.form, {foreignKey: 'id_opd'});
  };
  return Model;
};