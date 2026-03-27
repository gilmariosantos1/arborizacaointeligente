import db from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const SALT_ROUNDS = 10;
const SECRET = 'seu_segredo_aqui';

// CADASTRAR
export const criar = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nome, email, cpf, senha, cep, cidade, estado } = req.body;

        // Verificar se email ja é cadastrado
        const userExists = await db.User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Email ja cadastrado' });
        }

        // Criptografando senha
        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

        const novoUsuario = await db.User.create({
            nome, email, cpf, senha: senhaHash, cep, cidade, estado
        });

        //Removendo senha da resposta
        const { senha: _, ...userSemSenha } = novoUsuario.toJSON();

        res.status(201).json(userSemSenha);

    } catch (err) { next(err); }
};

// LOGIN
export const login = async (req, res, next) => {
    try {
        const { email, senha } = req.body;

        const usuario = await db.User.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        const token = jwt.sign(
            {id: usuario.id, email: usuario.email }, SECRET, {expiresIn: '1d'}
        );

        const { senha: _, ...userSemSenha } = usuario.toJSON();

        res.json({
            message: 'Login realizado com sucesso', token, user: userSemSenha
        });
    } catch (err) { next(err); }

};