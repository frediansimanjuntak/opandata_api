'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('dataset', {
    nama: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {});
  Model.associate = function(models) {
    // associations can be defined here
    // this.forms = this.hasMany(models.form, {foreignKey: 'id_dataset'});
  };
  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Model;
};