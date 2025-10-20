// src/controllers/patientController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllPatients(req, res) {
  try {
    const patients = await prisma.user.findMany({
      where: { role: 'PATIENT' },
      select: { id: true, name: true, email: true, createdAt: true }
    });
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching patients' });
  }
}
