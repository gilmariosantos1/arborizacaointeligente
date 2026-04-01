import { Router } from 'express';
import { createUserController, userValidators } from '../controllers/userController.js';
import validateRequest from '../middlewares/validateRequest.js';
import db from '../models/index.js';

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