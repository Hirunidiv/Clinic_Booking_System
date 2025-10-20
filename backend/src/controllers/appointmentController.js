// src/controllers/appointmentController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAppointments(req, res) {
  try {
    const { role, userId } = req.user || {};
    if (role === 'ADMIN') {
      const appts = await prisma.appointment.findMany({
        include: { patient: true, doctor: true },
        orderBy: { appointmentDateTime: 'asc' }
      });
      return res.json(appts);
    }

    // if doctor -> show appointments for that doctor (assuming doctor.userId maps)
    if (role === 'DOCTOR') {
      const doctor = await prisma.doctor.findFirst({ where: { userId: Number(userId) } });
      if (!doctor) return res.status(404).json({ message: 'Doctor not found for this account' });
      const appts = await prisma.appointment.findMany({
        where: { doctorId: doctor.id },
        include: { patient: true, doctor: true },
        orderBy: { appointmentDateTime: 'asc' }
      });
      return res.json(appts);
    }

    // patient -> own appointments
    const appts = await prisma.appointment.findMany({
      where: { patientId: Number(userId) },
      include: { patient: true, doctor: true },
      orderBy: { appointmentDateTime: 'asc' }
    });
    res.json(appts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
}

export async function createAppointment(req, res) {
  try {
    const { doctorId, appointmentDateTime, reason } = req.body;
    const patientId = Number(req.user.userId);

    if (!doctorId || !appointmentDateTime) return res.status(400).json({ message: 'doctorId and appointmentDateTime required' });

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId: Number(doctorId),
        appointmentDateTime: new Date(appointmentDateTime),
        reason,
        status: 'BOOKED'
      },
      include: { patient: true, doctor: true }
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating appointment' });
  }
}

export async function updateAppointment(req, res) {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    // Basic authorization: patient can update their appointment, admin can update any
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    const requestingUserId = Number(req.user.userId);
    const role = req.user.role;

    if (role !== 'ADMIN' && appointment.patientId !== requestingUserId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        appointmentDateTime: data.appointmentDateTime ? new Date(data.appointmentDateTime) : appointment.appointmentDateTime,
        reason: data.reason ?? appointment.reason,
        status: data.status ?? appointment.status,
        updatedAt: new Date()
      },
      include: { patient: true, doctor: true }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating appointment' });
  }
}

export async function deleteAppointment(req, res) {
  try {
    const id = Number(req.params.id);
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    const requestingUserId = Number(req.user.userId);
    const role = req.user.role;

    if (role !== 'ADMIN' && appointment.patientId !== requestingUserId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await prisma.appointment.delete({ where: { id } });
    res.json({ message: 'Appointment canceled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting appointment' });
  }
}
