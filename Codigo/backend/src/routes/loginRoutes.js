import { Router } from 'express';
import {createLoginController, LoginValidators } from '../constrollers/LoginController.js';

const router = Router();

router.post(
    '/',
    LoginValidators.create,
    validateRequest,
    createLoginController
);

export default router