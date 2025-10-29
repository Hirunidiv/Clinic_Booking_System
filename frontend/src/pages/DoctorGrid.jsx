import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, MoreVertical } from "lucide-react";
import AdminSideBar from "../components/AdminSideBar";
import AdminNavbar from "../components/Navbar";
import AddDoctorModal from "../components/AddDoctor";

const DoctorGrid = () => {
  const [doctors, setDoctors] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ FIX: ensure API_BASE is always valid
  const API_BASE =
    import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== ""
      ? import.meta.env.VITE_API_URL
      : "http://localhost:4000"; // fallback if env variable missing

  // Fetch doctors from backend
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/doctors`);
      console.log("Fetched doctors:", res.data);
      setDoctors(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDelete = async (doctor) => {
    if (!window.confirm(`Delete Dr. ${doctor.name}?`)) return;

    try {
      await axios.delete(`${API_BASE}/api/doctors/${doctor.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if auth required
        },
      });
      setDoctors(doctors.filter((d) => d.id !== doctor.id));
    } catch (err) {
      console.error(err);
      alert("Error deleting doctor");
    } finally {
      setOpenMenuId(null);
    }
  };

  const handleAddDoctor = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleDoctorSubmit = async (doctorData) => {
    try {
      const res = await axios.post(`${API_BASE}/api/doctors`, doctorData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDoctors([...doctors, res.data]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error adding doctor");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSideBar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Doctor Grid</h1>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                Total Doctors : {doctors.length}
              </span>
            </div>
            <button
              onClick={handleAddDoctor}
              className="inline-flex items-center px-4 py-2 bg-[#2E37A4] hover:bg-[#252d8a] text-white font-medium text-sm rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" /> New Doctor
            </button>
          </div>

          {/* Doctor Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {Array.isArray(doctors) &&
              doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={doctor.imageUrl || "https://placehold.co/100x100?text=No+Image"}
                          alt={doctor.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {doctor.specialization}
                          </p>
                          <p className="text-xs text-gray-400">
                            Available: {doctor.availability || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => toggleMenu(doctor.id)}
                          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                        {openMenuId === doctor.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                              <button
                                onClick={() => console.log("Edit:", doctor)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(doctor)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <AddDoctorModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleDoctorSubmit}
        onDoctorAdded={fetchDoctors} // refresh list after adding
      />
    </div>
  );
};

export default DoctorGrid;
