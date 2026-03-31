import db from '../config/db.js';

const userModel = {
    async create(user) {
        const {nome, email, cpf, data_nascimento, cep, estado, cidade, senha} = user;

        const query = `
            INSERT INTO usuario (nome, email, cpf, data_nascimento, cep, estado, cidade, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const [result] = await db.execute(query, [nome, email, cpf, data_nascimento, cep, estado, cidade, senha]);

        return {
            id: result.insertId,
            nome, email, cpf, data_nascimento, cep, estado, cidade
        };
    },

    async findByEmail(email) {
        const query = `SELECT * FROM usuario WHERE email = ?`;

        const [rows] = await db.execute(query, [email]);

        return rows[0];
    }

    
};

export default userModel;