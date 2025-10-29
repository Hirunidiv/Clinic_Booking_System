import React, { useState } from "react";
import axios from "axios";

const AddDoctorModal = ({ isOpen, onClose, onDoctorAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
  });

  const API_BASE = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend
      const response = await axios.post(`${API_BASE}/api/doctors`, formData);
      console.log("Doctor added:", response.data);

      // Notify parent to refresh doctor list
      if (onDoctorAdded) onDoctorAdded();

      // Clear form and close modal
      setFormData({
        name: "",
        specialization: "",
        email: "",
        phone: "",
      });
      onClose();
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor. Please check the backend connection.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[400px] p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Doctor</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;
