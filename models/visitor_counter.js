'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('visitor_counter', {
    counter: DataTypes.INTEGER
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