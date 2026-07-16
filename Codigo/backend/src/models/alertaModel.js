export default (sequelize, DataTypes) => {
  const Alerta = sequelize.define('Alerta', {
    id_upload: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    assunto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imagem_endereco: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    data_alerta: {
      type: DataTypes.DATE,
      allowNull: false
    },
    usuario_id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    municipalidade_id_municipalidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'alertas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })

  Alerta.associate = (models) => {
    Alerta.belongsTo(models.Usuario, { foreignKey: 'usuario_id_usuario' })
    Alerta.belongsTo(models.Municipalidade, { foreignKey: 'municipalidade_id_municipalidade' })
  }

  return Alerta
}