import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';

dotenv.config({
  path: '../.env'
});
const app = express();

app.use(cors());
app.use(express.json());

async function testConnection() {
  try {
    const connection = await db.getConnection();

    console.log('✅ Banco conectado com sucesso!');

    connection.release();
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error.message);
  }
}

testConnection();

app.get('/', (req, res) => {
    res.json({
        message: 'API funcionando'
    });
    console.log(process.env.PORT);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

