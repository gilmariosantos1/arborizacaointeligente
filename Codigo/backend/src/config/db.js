import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
});

const sequelize = new Sequelize(
    process.env.DB_NAME || 'arborizacao_inteligente',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        define: { 
            underscored: true,
            timestamps: true,
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
)

sequelize.authenticate()
  .then(() => {
    console.log('✓ Conectado ao MySQL com sucesso!');
  })
  .catch(err => {
    console.error('✗ Erro ao conectar ao MySQL:', err.message);
    process.exit(1);
  });

export default sequelize;