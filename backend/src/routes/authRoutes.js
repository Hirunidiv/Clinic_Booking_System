// src/routes/authRoutes.js
import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

export default router;
