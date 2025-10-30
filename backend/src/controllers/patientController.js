// src/controllers/patientController.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export async function getAllPatients(req, res) {
  try {
    const requesterRole = req.user?.role;
    const requesterId = req.user?.id;

    if (requesterRole === 'ADMIN') {
      const patients = await prisma.user.findMany({
        where: { role: 'PATIENT' },
        select: { id: true, name: true, email: true, createdAt: true }
      });
      return res.json(patients);
    }

    // If requester is a patient, return only their own record
    if (requesterRole === 'PATIENT') {
      if (!requesterId) return res.status(400).json({ message: 'Invalid requester id' });
      const patient = await prisma.user.findUnique({
        where: { id: Number(requesterId) },
        select: { id: true, name: true, email: true, createdAt: true }
      });
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      return res.json([patient]);
    }

    // Other roles are forbidden
    return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching patients' });
  }
}

export async function createPatient(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: 'PATIENT'
      },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating patient' });
  }
}

export async function updatePatient(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Invalid id param' });

    const { name, email, password } = req.body;

    const patient = await prisma.user.findUnique({ where: { id } });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (patient.role !== 'PATIENT') return res.status(400).json({ message: 'User is not a patient' });

    const data = {};
    if (name) data.name = name;
    if (email && email !== patient.email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return res.status(409).json({ message: 'Email already in use' });
      data.email = email;
    }
    if (password) {
      data.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, createdAt: true }
    });

    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating patient' });
  }
}

export async function deletePatient(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Invalid id param' });

    const patient = await prisma.user.findUnique({ where: { id } });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (patient.role !== 'PATIENT') return res.status(400).json({ message: 'User is not a patient' });

    await prisma.user.delete({ where: { id } });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting patient' });
  }
}
