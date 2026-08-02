// controllers/userController.js
import { body, param } from 'express-validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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

    body('data_nascimento')
      .isISO8601()
      .toDate()
      .withMessage('Data de nascimento inválida. Use o formato YYYY-MM-DD'),
  ],

  login: [
    body('email').isEmail().normalizeEmail().withMessage('E-mail inválido'),
    body('senha').notEmpty().withMessage('Senha é obrigatória'),
  ],

  forgotPassword: [
    body('email').isEmail().normalizeEmail().withMessage('E-mail inválido'),
  ],

  resetPassword: [
    body('token').notEmpty().withMessage('Token inválido'),
    body('senha').isString().isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
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

    body('data_nascimento')
      .optional()
      .isISO8601()
      .toDate()
      .withMessage('Data de nascimento inválida. Use o formato YYYY-MM-DD'),
  ],
};

// ─── Factory ──────────────────────────────────────────────────────────────────

const createMailerTransport = () => {
  if (process.env.SMTP_URL) {
    return nodemailer.createTransport(process.env.SMTP_URL);
  }

  const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  const hasSmtpConfig = Boolean(process.env.SMTP_HOST || process.env.SMTP_SERVICE || process.env.SMTP_USER || smtpPass);

  if (hasSmtpConfig) {
    return nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || undefined,
      host: process.env.SMTP_HOST || undefined,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined,
      secure: process.env.SMTP_SECURE === 'true',
      family: 4,
      requireTLS: process.env.SMTP_REQUIRE_TLS !== 'false',
      auth: process.env.SMTP_USER || smtpPass
        ? {
            user: process.env.SMTP_USER || '',
            pass: smtpPass,
          }
        : undefined,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    return nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    });
  }

  return nodemailer.createTransport({
    host: 'localhost',
    port: 25,
    secure: false,
    ignoreTLS: true,
  });
};

export const createUserController = (UserModel) => ({
  cadastrar: async (req, res) => {
    try {
      const { nome, email, senha, cpf, cep, estado, cidade, data_nascimento } = req.body;

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
        data_nascimento,
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
        process.env.JWT_SECRET || 'dev-secret-key',
        { expiresIn: '1d' }
      );

      const { senha: _, ...userWithoutPassword } = user.toJSON();
      return res.json({ token, user: userWithoutPassword });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao realizar login', detalhe: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return res.status(200).json({ message: 'Se o e-mail existir, enviaremos instruções para redefinir a senha.' });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      await user.update({
        password_reset_token: token,
        password_reset_expires_at: expiresAt,
      });

      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/redefinir-senha?token=${token}`;
      const senderEmail = process.env.SMTP_FROM || 'no-reply@arborizacaointeligente.com';

      const transporter = createMailerTransport();

      const mailOptions = {
        from: senderEmail,
        to: email,
        subject: 'Recuperação de senha',
        text: `Clique no link para redefinir sua senha:\n\n${resetLink}\n\nSe você não solicitou, ignore esta mensagem.`,
        html: `<p>Clique no link para redefinir sua senha:</p><p><a href="${resetLink}">${resetLink}</a></p><p>Se você não solicitou, ignore esta mensagem.</p>`,
      };

      let emailSent = false;
      try {
        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (mailerError) {
        console.error('Erro ao enviar e-mail de recuperação:', mailerError);
      }

      return res.status(200).json({
        message: emailSent
          ? 'Enviamos as instruções para o seu e-mail.'
          : 'Não foi possível enviar o e-mail. Verifique a configuração de SMTP.',
        resetLink: process.env.NODE_ENV === 'development' ? resetLink : undefined,
      });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao solicitar redefinição de senha', detalhe: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, senha } = req.body;

      const user = await UserModel.findOne({ where: { password_reset_token: token } });
      if (!user) {
        return res.status(400).json({ erro: 'Token inválido ou expirado.' });
      }

      if (!user.password_reset_expires_at || new Date(user.password_reset_expires_at) < new Date()) {
        return res.status(400).json({ erro: 'Token inválido ou expirado.' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      await user.update({
        senha: senhaHash,
        password_reset_token: null,
        password_reset_expires_at: null,
      });

      return res.json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao redefinir senha', detalhe: error.message });
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
