'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('logo_opd', {
    photo: DataTypes.STRING,
    id_opd: DataTypes.STRING
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