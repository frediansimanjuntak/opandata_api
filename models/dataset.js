'use strict';
module.exports = (sequelize, DataTypes) => {
  var DataSet = sequelize.define('dataset', {
    nama: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {});
  DataSet.associate = function(models) {
    // associations can be defined here
    this.forms = this.hasMany(models.form, {foreignKey: 'id_dataset'});
  };
  DataSet.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return DataSet;
};