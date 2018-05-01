'use strict';
module.exports = (sequelize, DataTypes) => {
  var Form = sequelize.define('Form', {
    nama: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    id_opd: {type: DataTypes.INTEGER(9), allowNull: false},
    id_dataset: {type: DataTypes.INTEGER, allowNull: false}
  }, {});
  Form.associate = function(models) {
    // associations can be defined here
    this.m_opd = this.belongsTo(models.m_opd, {foreignKey: 'id_opd'});
    this.Datasets = this.belongsTo(models.DataSet, {foreignKey: 'id_dataset'});
    this.Fields = this.hasMany(models.Field, {foreignKey: 'id_form'});
  };
  Form.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Form;
};