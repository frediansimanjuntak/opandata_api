'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('value', {
    nama: DataTypes.STRING,
    id_form: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_field: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    group:DataTypes.INTEGER
  }, {});
  Model.associate = function(models) {
    // associations can be defined here
    this.forms = this.belongsTo(models.form, {foreignKey: 'id_form'});
    this.fields = this.belongsTo(models.field, {foreignKey: 'id_field'});
  };
  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Model;
};