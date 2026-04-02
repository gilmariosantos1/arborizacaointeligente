// controllers/userController.js
import { body, param } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ─── Validators ───────────────────────────────────────────────────────────────

export const userValidators = {
  id: [
    param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  ],

  create: [
    body('nome').isString().trim().isLength({ min: 2 }).withMessage('Nome deve ter no mínimo 2 caracteres'),
    body('email').isEmail().normalizeEmail().withMessage('E-mail inválido'),
    body('senha').isString().isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),

    body('cpf')
      .isString()
      .trim()
      .matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)
      .withMessage('CPF inválido'),

    body('cep')
      .isString()
      .trim()
      .matches(/^\d{5}-?\d{3}$/)
      .withMessage('CEP inválido'),

    body('estado')
      .isString()
      .trim()
      .isLength({ min: 2, max: 2 })
      .toUpperCase()
      .withMessage('Estado deve ser a sigla com 2 letras (ex: SP)'),

    body('cidade')
      .isString()
      .trim()
      .isLength({ min: 2 })
      .withMessage('Cidade deve ter no mínimo 2 caracteres'),

    body('dataNascimento')
      .isISO8601()
      .toDate()
      .withMessage('Data de nascimento inválida. Use o formato YYYY-MM-DD'),
  ],

  login: [
    body('email').isEmail().normalizeEmail().withMessage('E-mail inválido'),
    body('senha').notEmpty().withMessage('Senha é obrigatória'),
  ],

  update: [
    param('id').isInt({ min: 1 }).withMessage('ID inválido'),
    body('nome').optional().isString().trim().isLength({ min: 2 }).withMessage('Nome deve ter no mínimo 2 caracteres'),
    body('email').optional().isEmail().normalizeEmail().withMessage('E-mail inválido'),
    body('senha').optional().isString().isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),

    body('cpf')
      .optional()
      .isString()
      .trim()
      .matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)
      .withMessage('CPF inválido'),

    body('cep')
      .optional()
      .isString()
      .trim()
      .matches(/^\d{5}-?\d{3}$/)
      .withMessage('CEP inválido'),

    body('estado')
      .optional()
      .isString()
      .trim()
      .isLength({ min: 2, max: 2 })
      .toUpperCase()
      .withMessage('Estado deve ser a sigla com 2 letras (ex: SP)'),

    body('cidade')
      .optional()
      .isString()
      .trim()
      .isLength({ min: 2 })
      .withMessage('Cidade deve ter no mínimo 2 caracteres'),

    body('dataNascimento')
      .optional()
      .isISO8601()
      .toDate()
      .withMessage('Data de nascimento inválida. Use o formato YYYY-MM-DD'),
  ],
};

// ─── Factory ──────────────────────────────────────────────────────────────────

export const createUserController = (UserModel) => ({
  cadastrar: async (req, res) => {
    try {
      const { nome, email, senha, cpf, cep, estado, cidade, dataNascimento } = req.body;

      const existente = await UserModel.findOne({ where: { email } });
      if (existente) {
        return res.status(409).json({ erro: 'E-mail já cadastrado' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const user = await UserModel.create({
        nome,
        email,
        senha: senhaHash,
        cpf,
        cep,
        estado,
        cidade,
        dataNascimento,
      });

      const { senha: _, ...dados } = user.toJSON();
      return res.status(201).json(dados);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhe: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao realizar login', detalhe: error.message });
    }
  },

  listar: async (req, res) => {
    try {
      const users = await UserModel.findAll({ attributes: { exclude: ['senha'] } });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao listar usuários', detalhe: error.message });
    }
  },

  obter: async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.params.id, {
        attributes: { exclude: ['senha'] },
      });
      if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao obter usuário', detalhe: error.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.params.id);
      if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

      if (req.body.senha) {
        req.body.senha = await bcrypt.hash(req.body.senha, 10);
      }

      await user.update(req.body);

      const { senha: _, ...dados } = user.toJSON();
      return res.json(dados);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhe: error.message });
    }
  },

  remover: async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.params.id);
      if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

      await user.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao remover usuário', detalhe: error.message });
    }
  },
});
