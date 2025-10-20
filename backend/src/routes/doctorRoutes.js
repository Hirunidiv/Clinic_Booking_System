// src/routes/doctorRoutes.js
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleCheck } from '../middlewares/roleCheck.js';
import { getAllDoctors, createDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.get('/', getAllDoctors);
router.post('/', authMiddleware, roleCheck(['ADMIN']), createDoctor);
router.put('/:id', authMiddleware, roleCheck(['ADMIN']), updateDoctor);
router.delete('/:id', authMiddleware, roleCheck(['ADMIN']), deleteDoctor);

export default router;
