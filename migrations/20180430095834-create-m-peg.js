'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('m_peg', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      gelar_depan: {
        type: Sequelize.STRING
      },
      gelar_belakang: {
        type: Sequelize.STRING
      },
      // id_opd: {
      //   type: Sequelize.UUID,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'm_opd',
      //     key: 'id_opd'
      //   }
      // },
      waktu_add: {
        allowNull: false,
        type: Sequelize.DATE
      },
      waktu_modifi: {
        allowNull: false,
        type: Sequelize.DATE
      },
      nip: {
        type: Sequelize.STRING
      },
      nik: {
        type: Sequelize.STRING
      },
      jk: {
        type: Sequelize.STRING
      },
      kawin: {
        type: Sequelize.STRING
      },
      status_peg: {
        type: Sequelize.STRING
      },
      gol_ruang: {
        type: Sequelize.STRING
      },
      eselon: {
        type: Sequelize.STRING
      },
      jabatan: {
        type: Sequelize.STRING
      },
      ket_jabatan: {
        type: Sequelize.STRING
      },
      agama: {
        type: Sequelize.STRING
      },
      tampil_alamat: {
        type: Sequelize.STRING
      }, 
      alamat: {
        type: Sequelize.STRING
      },
      alamat_rt: {
        type: Sequelize.STRING
      },
      alamat_rw: {
        type: Sequelize.STRING
      },
      alamat_kel: {
        type: Sequelize.STRING
      },
      alamat_kec: {
        type: Sequelize.STRING
      },
      alamat_kota: {
        type: Sequelize.STRING
      },
      alamat_prov: {
        type: Sequelize.STRING
      },
      gol_darah: {
        type: Sequelize.STRING
      },
      pend_terakhir: {
        type: Sequelize.STRING
      },
      pend_umum: {
        type: Sequelize.STRING
      },
      tgl_lulus: {
        type: Sequelize.STRING
      },
      tmp_lahir: {
        type: Sequelize.STRING
      },
      tgl_lahir: {
        type: Sequelize.STRING
      },
      tmt_cpns: {
        type: Sequelize.STRING
      },
      tampil_email1: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      tampil_email2: {
        type: Sequelize.STRING
      },
      email2: {
        type: Sequelize.STRING
      },
      tampil_ponsel1: {
        type: Sequelize.STRING
      },
      ponsel1: {
        type: Sequelize.STRING
      },
      tampil_ponsel2: {
        type: Sequelize.STRING
      },
      ponsel2: {
        type: Sequelize.STRING
      },
      twitter: {
        type: Sequelize.STRING
      },
      facebook: {
        type: Sequelize.STRING
      },
      telegram: {
        type: Sequelize.STRING
      },
      tentang_peg: {
        type: Sequelize.STRING
      },
      foto_peg: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('m_peg');
  }
};