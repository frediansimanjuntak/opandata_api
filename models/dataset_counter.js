'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('dataset_counter', {
    counter: DataTypes.INTEGER,
    id_dataset: {
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