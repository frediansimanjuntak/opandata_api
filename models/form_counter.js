'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('form_counter', {
    counter: DataTypes.INTEGER,
    id_form: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  }, {});
  Model.associate = function(models) {
    // associations can be defined here
  };
  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Model;
};