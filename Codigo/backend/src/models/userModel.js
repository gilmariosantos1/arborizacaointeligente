import { DataTypes } from 'sequelize';
import { underscoredIf } from 'sequelize/lib/utils';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true
        },
        data_nascimento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        cep: {
            type: DataTypes.STRING(8),
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        cidade: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
            tableName: 'usuarios',
            timestamps: true,
            underscored: true,
    });

    return User;
};