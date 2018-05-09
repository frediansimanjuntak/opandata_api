'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('form', {
    nama: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    id_dataset: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  }, {});
  Model.associate = function(models) {
    // associations can be defined here
    this.datasets = this.belongsTo(models.dataset, {foreignKey: 'id_dataset',});
    this.fields = this.hasMany(models.field, {foreignKey: 'id_form'});
    this.values = this.hasMany(models.value, {foreignKey: 'id_form'});
  };
  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Model;
};