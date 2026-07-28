import { DataTypes } from "sequelize";

export default (sequelize, DataTypes) => {
    const Contatos = sequelize.define('Contatos', {
        id_contato: {
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
            allowNull: false
        },
        assunto: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        mensagem: {
            type: DataTypes.STRING(300),
            allowNull: false
        }
    }, {
        tableName: 'contatos',
        timestamps: true,
        underscored: true
    });
    
    return Contatos

};