'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('m_peg', {
    id_peg: {
      type: DataTypes.CHAR(18),
      primaryKey: true,
    },
    nama: DataTypes.STRING,
    gelar_depan: DataTypes.STRING,
    gelar_belakang: DataTypes.STRING,
    waktu_add: DataTypes.STRING,
    waktu_modifi: DataTypes.STRING,
    nip: DataTypes.STRING,
    nik: DataTypes.STRING,
    jk: DataTypes.STRING,
    kawin: DataTypes.STRING,
    status_peg: DataTypes.STRING,
    gol_ruang: DataTypes.STRING,
    eselon: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    ket_jabatan: DataTypes.STRING,
    agama: DataTypes.STRING,
    tampil_alamat: DataTypes.STRING,
    alamat: DataTypes.STRING,
    alamat_rt: DataTypes.STRING,
    alamat_rw: DataTypes.STRING,
    alamat_kel: DataTypes.STRING,
    alamat_kec: DataTypes.STRING,
    alamat_kota: DataTypes.STRING,
    alamat_prov: DataTypes.STRING,
    gol_darah: DataTypes.STRING,
    pend_terakhir: DataTypes.STRING,
    pend_umum: DataTypes.STRING,
    tgl_lulus: DataTypes.STRING,
    tmp_lahir: DataTypes.STRING,
    tgl_lahir: DataTypes.STRING,
    tmt_cpns: DataTypes.STRING,
    email: DataTypes.STRING,
    tampil_email2: DataTypes.STRING,
    email2: DataTypes.STRING,
    tampil_ponsel1: DataTypes.STRING,
    ponsel1: DataTypes.STRING,
    tampil_ponsel2: DataTypes.STRING,
    twitter: DataTypes.STRING,
    facebook: DataTypes.STRING,
    telegram: DataTypes.STRING,
    tentang_peg: DataTypes.STRING,
    foto_peg: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });
  Model.associate = function(models) {
    // this.users = this.hasMany(models.user, {foreignKey: 'id_peg'});
  };
  return Model;
};