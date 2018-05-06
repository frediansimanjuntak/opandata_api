'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('m_hakakses', {
      id_hakaskses: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TINYINT(2)
      },
      hakakses: {
        type: Sequelize.STRING
      },
      ket_hakakses: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('m_hakakses');
  }
};