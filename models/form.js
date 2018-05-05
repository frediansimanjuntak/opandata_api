'use strict';
module.exports = (sequelize, DataTypes) => {
  var Form = sequelize.define('form', {
    nama: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    id_opd: {type: DataTypes.INTEGER, allowNull: false},
    id_dataset: {type: DataTypes.INTEGER, allowNull: false}
  }, {});
  Form.associate = function(models) {
    // associations can be defined here
    this.m_opd = this.belongsTo(models.m_opd, {foreignKey: 'id_opd'});
    this.datasets = this.belongsTo(models.dataset, {foreignKey: 'id_dataset'});
    this.fields = this.hasMany(models.field, {foreignKey: 'id_form'});
  };
  Form.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Form;
};