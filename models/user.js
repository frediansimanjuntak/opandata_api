'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('user', {
        username    : {type: DataTypes.STRING, allowNull: true, unique: true},
        email       : {type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: {msg: "Email invalid."} }},
        phone       : {type: DataTypes.STRING, allowNull: true, unique: true, validate: { len: {args: [7, 20], msg: "Phone number invalid, too short."}, isNumeric: { msg: "not a valid phone number."} }},
        id_peg: {
            type: DataTypes.CHAR(18),
            allowNull: false
        },
        id_hakakses: {
            type: DataTypes.TINYINT(2),
            allowNull: false
        },
        password    : DataTypes.STRING,
    });

    Model.associate = function(models){
        this.m_peg = this.belongsTo(models.m_peg, {foreignKey: 'id_peg'});
        this.m_hakakses = this.belongsTo(models.m_hakakses, {foreignKey: 'id_hakakses'});
    };

    Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            user.password = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass
        if(!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if(err) TE(err);

        if(!pass) TE('invalid password');

        return this;
    }

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer "+jwt.sign({user_id:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};