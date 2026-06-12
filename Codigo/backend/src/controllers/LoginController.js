import models from '../models/indexModel';
import crypto from 'crypto';
import { body } from 'express-validator';

export const LoginValidators = {
    create: [
        body('email').isEmail().withMessage('E-mail inválido'),
        body('senha').notEmpty().withMessage('A senha é obrigatória')
    ]
}

export const createLoginController = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await models.userModel.findOne({
            where: {email}
        });

        if (!usuario) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }

        const senhaHasheada = crypto.createHash('sha256').update(senha).digest('hex');

    } catch(error) {
        console.error('Erro no LoginController: ', error);
        return res.status(500).json({ error: 'Erro interno ao processar login.'});
    }
}