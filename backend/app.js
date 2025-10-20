import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import doctorRoutes from "./routes/doctorRoutes.js"
import appointmentRoutes from "./routes/appointmentRoutes.js"
import patientRoutes from "./routes/patientRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Clinic Appointment API is running" })
})

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/doctors", doctorRoutes)
app.use("/api/appointments", appointmentRoutes)
app.use("/api/patients", patientRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Error handler (must be last)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`📍 Health check: http://localhost:${PORT}/health`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`)
})
