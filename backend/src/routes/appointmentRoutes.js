// src/routes/appointmentRoutes.js
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

// all appointment endpoints require auth
router.use(authMiddleware);

router.get('/', getAppointments);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
