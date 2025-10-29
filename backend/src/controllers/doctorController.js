// src/controllers/doctorController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllDoctors(req, res) {
  try {
    const doctors = await prisma.doctor.findMany();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
}

export async function createDoctor(req, res) {
  try {
    const { name, specialization, description, imageUrl, availability, userId } = req.body;
    if (!name || !specialization) return res.status(400).json({ message: 'Name and specialization required' });

    const doctor = await prisma.doctor.create({
      data: { name, specialization, description, imageUrl, availability, userId }
    });
    res.status(201).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating doctor' });
  }
}

export async function updateDoctor(req, res) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const doctor = await prisma.doctor.update({
      where: { id },
      data
    });
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating doctor' });
  }
}

export async function deleteDoctor(req, res) {
  try {
    const id = Number(req.params.id);
    await prisma.doctor.delete({ where: { id } });
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting doctor' });
  }
}