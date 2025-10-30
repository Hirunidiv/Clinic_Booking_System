// src/routes/patientRoutes.js
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleCheck } from '../middlewares/roleCheck.js';
import { getAllPatients, createPatient, updatePatient, deletePatient } from '../controllers/patientController.js';

const router = express.Router();

router.get('/', authMiddleware, roleCheck(['ADMIN','PATIENT']), getAllPatients);

// Admin-only endpoints to manage patients
router.post('/', authMiddleware, roleCheck(['ADMIN']), createPatient);
router.put('/:id', authMiddleware, roleCheck(['ADMIN']), updatePatient);
router.delete('/:id', authMiddleware, roleCheck(['ADMIN']), deletePatient);

export default router;
