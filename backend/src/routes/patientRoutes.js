// src/routes/patientRoutes.js
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleCheck } from '../middlewares/roleCheck.js';
import { getAllPatients } from '../controllers/patientController.js';

const router = express.Router();

router.get('/', authMiddleware, roleCheck(['ADMIN']), getAllPatients);

export default router;
