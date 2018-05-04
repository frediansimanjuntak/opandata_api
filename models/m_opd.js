'use strict';
module.exports = (sequelize, DataTypes) => {
  var m_opd = sequelize.define('m_opd', {
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
  m_opd.associate = function(models) {
    // associations can be defined here
    this.Forms = this.hasMany(models.Form, {foreignKey: 'id_opd'});
  };
  return m_opd;
};