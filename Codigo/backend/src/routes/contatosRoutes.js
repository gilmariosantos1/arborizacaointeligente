import { Router } from 'express';
import validateRequest from '../middleware/validateRequest.js';
import { ContatosValidators, createContatosController } from '../controllers/ContatosController.js';
import db from '../models/indexModel.js';

const router = Router();

const controllers = createContatosController(db.Contatos)

router.post(
   '/',
   validateRequest,
   ContatosValidators.create,
   controllers.cadastrar
)

export default router;