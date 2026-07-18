import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import ContatosRoutes from './routes/contatosRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando'
  });
});

app.use(userRoutes);
app.use('/contatos', ContatosRoutes);

export default app;