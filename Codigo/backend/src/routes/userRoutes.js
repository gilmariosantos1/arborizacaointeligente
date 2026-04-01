import { Router } from 'express';
import * as controller from '../controllers/userController.js';
import { body } from 'express-validator';

const router = Router();

router.post('/cadastro', [
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

  // Data de nascimento no formato YYYY-MM-DD
  body('dataNascimento')
    .isISO8601()
    .toDate()
    .withMessage('Data de nascimento inválida. Use o formato YYYY-MM-DD'),

], controller.cadastrar);

router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('E-mail inválido'),
  body('senha').notEmpty().withMessage('Senha é obrigatória'),
], controller.login);

// Rotas protegidas

router.put('/:id', [
  body('nome').optional().isString().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('senha').optional().isString().isLength({ min: 6 }),

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

], controller.atualizar);
router.delete('/:id', controller.remover);

export default router;