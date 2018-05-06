'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('m_opd', {
      id_opd: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(9)
      },
      nama_opd: {
        type: Sequelize.STRING
      },
      akronim_opd: {
        type: Sequelize.STRING
      },
      kepala_opd: {
        type: Sequelize.STRING
      },
      telp: {
        type: Sequelize.STRING
      },
      fax: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      alamat_kel: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('m_opd');
  }
};