import { Router } from 'express';
import { createUserController, userValidators } from '../controllers/userController.js';
import validateRequest from '../middleware/validateRequest.js';
import db from '../models/indexModel.js';

const router = Router();

const controllers = createUserController(db.User);

// Rotas públicas
router.post(
  '/cadastro',
  userValidators.create,
  validateRequest,
  controllers.cadastrar
);

router.post(
  '/login',
  userValidators.login,
  validateRequest,
  controllers.login
);

router.post(
  '/forgot-password',
  userValidators.forgotPassword,
  validateRequest,
  controllers.forgotPassword
);

router.post(
  '/reset-password',
  userValidators.resetPassword,
  validateRequest,
  controllers.resetPassword
);

// Rotas protegidas
router.get('/', controllers.listar);

router.get(
  '/:id',
  userValidators.id,
  validateRequest,
  controllers.obter
);

router.put(
  '/:id',
  userValidators.update,
  validateRequest,
  controllers.atualizar
);

router.delete(
  '/:id',
  userValidators.id,
  validateRequest,
  controllers.remover
);

export default router;