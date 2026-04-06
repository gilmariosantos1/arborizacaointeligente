import app from './src/server.js';
import db from './src/models/indexModel.js';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.sequelize.sync({ force: false }); // force: true para recriar tabelas
    console.log('Banco de dados sincronizado.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao sincronizar banco:', error);
  }
})();