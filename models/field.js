'use strict';
module.exports = (sequelize, DataTypes) => {
  var field = sequelize.define('field', {
    id_form: {type: DataTypes.INTEGER, allowNull: false},
    nama: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {});
  field.associate = function(models) {
    // associations can be defined here
    this.forms = this.belongsTo(models.form, {foreignKey: 'id_form'});
  };
  return field;
};