export default (sequelize, DataTypes) => {
  const Alerta = sequelize.define(
    "Alerta",
    {
      id_upload: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      assunto: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      imagem_endereco: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      data_alerta: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      usuario_id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      municipalidade_id_municipalidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "pendente",
          "em_analise",
          "resolvido",
          "rejeitado",
        ),
        allowNull: false,
        defaultValue: "pendente",
      },
    },
    {
      tableName: "alertas",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  Alerta.associate = (models) => {
    if (models.User) {
      Alerta.belongsTo(models.User, {
        foreignKey: "usuario_id_usuario",
        as: "usuario",
      });
    }

    if (models.Municipalidade) {
      Alerta.belongsTo(models.Municipalidade, {
        foreignKey: "municipalidade_id_municipalidade",
        as: "municipalidade",
      });
    }
  };

  return Alerta;
};
