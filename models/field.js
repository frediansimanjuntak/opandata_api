'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('field', {
    id_form: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {});
  Model.associate = function(models) {
    // associations can be defined here
    // this.forms = this.belongsTo(models.form, {foreignKey: 'id_form'});
  };
  return Model;
};