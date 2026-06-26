import { Router } from 'express';
import {createLoginController, LoginValidators } from '../controllers/LoginController';
import validateRequest from '../middleware/validateRequest.js';

const router = Router();

router.post(
    '/',
    LoginValidators.create,
    validateRequest,
    createLoginController
);

export default router