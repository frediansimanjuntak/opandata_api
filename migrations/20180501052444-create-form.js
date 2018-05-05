'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      id_opd: {
        type: Sequelize.INTEGER(9),
        references: {
          model: 'm_opd',
          key: 'id_opd'
        }
      },
      id_dataset: {
        type: Sequelize.INTEGER,
        references: {
          model: 'dataset',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Forms');
  }
};