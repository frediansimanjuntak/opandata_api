'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      phone: {
          type: Sequelize.STRING,
          unique : true,
      },      
      id_peg: {
        type: Sequelize.CHAR(18),
        references: {
          model: 'm_peg',
          key: 'id_peg'
        }
      },
      id_hakakses: {
        type: Sequelize.TINYINT(2),
        references: {
          model: 'm_hakakses',
          key: 'id_hakaskses'
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
    return queryInterface.dropTable('Users');
  }
};