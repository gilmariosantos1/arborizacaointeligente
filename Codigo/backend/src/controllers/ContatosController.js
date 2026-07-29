// import models from '../models/indexModel';
import { body } from 'express-validator';

export const ContatosValidators = {
    create:[
        body('email').isEmail().withMessage('E-mail inválido')
    ]
}

export const createContatosController = (ContatosModel) => ({
    cadastrar: async (req, res) => {
        try {
        const {nome, email, assunto, mensagem} = req.body;

        const contato = await ContatosModel.create({
            nome,
            email,
            assunto,
            mensagem,
        })

        return res.status(200).json({
            message: 'Contato realizado com sucesso!'});
    } catch(e) {
        console.error("Erro no ContatosController: ",e)
        return res.status(500).json({ error: "Erro interno ao processar Contatos" })
    }
    }
})