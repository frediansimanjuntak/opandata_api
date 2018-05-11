'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('informasi_situs', {
    isi: DataTypes.TEXT,
    photo: DataTypes.TEXT
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