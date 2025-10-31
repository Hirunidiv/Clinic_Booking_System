import { useState } from "react";
import axios from "axios";

const AddAppointment = ({ onAppointmentAdded }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // ✅ Get token from localStorage

      if (!token) {
        setMessage("❌ No token found. Please log in again.");
        setLoading(false);
        return;
      }

      // ✅ Combine date and time for backend compatibility
      const appointmentDateTime = new Date(`${formData.date}T${formData.time}`);

      const res = await axios.post(
        "http://localhost:4000/api/appointments",
        {
          patientId: formData.patientId,
          doctorId: formData.doctorId,
          appointmentDateTime,
          reason: formData.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token here
          },
        }
      );

      setMessage("✅ Appointment added successfully!");
      setFormData({ patientId: "", doctorId: "", date: "", time: "", reason: "" });
      if (onAppointmentAdded) onAppointmentAdded(res.data);
    } catch (error) {
      console.error("Error adding appointment:", error);
      setMessage("❌ Failed to add appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="patientId"
          placeholder="Patient ID"
          value={formData.patientId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="text"
          name="doctorId"
          placeholder="Doctor ID"
          value={formData.doctorId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
        <textarea
          name="reason"
          placeholder="Reason for Appointment"
          value={formData.reason}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Appointment"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
};

export default AddAppointment;
