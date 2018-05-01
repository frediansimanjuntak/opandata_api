'use strict';
module.exports = (sequelize, DataTypes) => {
  var field = sequelize.define('Field', {
    id_form: {type: DataTypes.INTEGER, allowNull: false},
    nama: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {});
  field.associate = function(models) {
    // associations can be defined here
    this.Forms = this.belongsTo(models.Form, {foreignKey: 'id_form'});
  };
  return field;
};