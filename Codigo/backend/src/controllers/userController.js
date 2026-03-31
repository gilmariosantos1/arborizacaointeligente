import userModel from '../models/userModel.js';
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
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            nome,
            email,
            cpf,
            data_nascimento,
            senha,
            cep,
            cidade,
            estado
        } = req.body;

        // Verificar se email já existe
        const userExists =
            await userModel.findByEmail(email);

        if (userExists) {
            return res.status(400).json({
                message: 'Email ja cadastrado'
            });
        }

        // Criptografar senha
        const senhaHash =
            await bcrypt.hash(
                senha,
                SALT_ROUNDS
            );

        // Criar usuário
        const novoUsuario =
            await userModel.create({
                nome,
                email,
                cpf,
                data_nascimento,
                senha: senhaHash,
                cep,
                cidade,
                estado
            });

        // Remover senha da resposta
        const {
            senha: _,
            ...userSemSenha
        } = novoUsuario;

        res.status(201).json(userSemSenha);

    } catch (err) {
        next(err);
    }
};

// LOGIN
export const login = async (req, res, next) => {
    try {
        const { email, senha } = req.body;

        // Buscar usuário por email
        const usuario =
            await userModel.findByEmail(email);

        if (!usuario) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }

        // Comparar senha
        const senhaValida =
            await bcrypt.compare(
                senha,
                usuario.senha
            );

        if (!senhaValida) {
            return res.status(401).json({
                message: 'Senha inválida'
            });
        }

        // Gerar token
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            SECRET,
            {
                expiresIn: '1d'
            }
        );

        // Remover senha da resposta
        const {
            senha: _,
            ...userSemSenha
        } = usuario;

        res.json({
            message:
                'Login realizado com sucesso',
            token,
            user: userSemSenha
        });

    } catch (err) {
        next(err);
    }
};