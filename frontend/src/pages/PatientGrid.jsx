// src/pages/PatientGrid.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, MoreVertical, Calendar, MapPin, RefreshCw } from 'lucide-react';
// import AdminSideBar from '../components/AdminSideBar';
// import AdminNavbar from '../components/Navbar';
// import AddPatientModal from '../components/AddPatient';
import AdminSideBar from '../components/AdminSideBar';
import AdminNavbar from '../components/Navbar';
import AddPatientModal from '../components/AddPatient';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';;

const PatientGrid = () => {
  const [patients, setPatients] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); // adjust if you store JWT differently
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  async function fetchPatients() {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/patients`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });
      // normalize data so UI expects fields used in grid
      const normalized = (res.data || []).map((p) => ({
        id: p.id,
        name: p.name,
        email: p.email || '',
        phone: p.phone || '', // backend likely doesn't have phone yet
        lastAppointment: p.lastAppointment || '—',
        location: p.location || '—',
        image: p.imageUrl || null,
        // keep other fields if any
        ...p,
      }));
      setPatients(normalized);
    } catch (err) {
      console.error('Error fetching patients:', err.response?.data || err.message || err);
      setPatients([]);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (patient) => {
    // implement edit modal or redirect later
    console.log('Edit patient:', patient);
    setOpenMenuId(null);
  };

  const handleDelete = async (patient) => {
    // simple optimistic UI + API call (requires admin auth)
    if (!window.confirm(`Delete patient "${patient.name}"? This cannot be undone.`)) return;
    try {
      await axios.delete(`${API_BASE}/patients/${patient.id}`, {
        headers: { ...getAuthHeaders() },
      });
      setPatients((prev) => prev.filter((p) => p.id !== patient.id));
    } catch (err) {
      console.error('Error deleting patient:', err.response?.data || err.message || err);
      alert('Failed to delete patient (check console).');
    } finally {
      setOpenMenuId(null);
    }
  };

  const handleAddPatient = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  // AddPatientModal will call this with the full form data object.
  // We only send fields supported by the backend (name, email, password).
  const handlePatientSubmit = async (formData) => {
    // formData shape from your AddPatientModal:
    // { firstName, lastName, phoneNumber, phoneCode, email, ...profileImage, ... }
    const name = `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Unnamed Patient';
    const email = formData.email || `${Date.now()}@example.com`;
    const password = 'Patient@123'; // default password. Change if you add password input.

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${API_BASE}/patients`,
        { name, email, password }, // only send supported fields
        {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
        }
      );

      // if the backend returns created patient, append / refresh
      if (res.status === 201 || res.status === 200) {
        // refresh list (safer than optimistic append because backend may modify)
        await fetchPatients();
      } else {
        console.warn('Unexpected create patient response:', res);
        await fetchPatients();
      }
    } catch (err) {
      console.error('Error creating patient:', err.response?.data || err.message || err);
      alert('Failed to create patient — check console for details.');
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSideBar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Patient Grid</h1>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                Total Patients : {patients.length}
              </span>
            </div>
            <button
              onClick={handleAddPatient}
              className="inline-flex items-center px-4 py-2 bg-[#2E37A4] hover:bg-[#252d8a] text-white font-medium text-sm rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Patient
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.length > 0 ? (
              patients.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={
                            patient.image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=E5E7EB&color=374151`
                          }
                          alt={patient.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base mb-1">
                            {patient.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {patient.email}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => toggleMenu(patient.id)}
                          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>

                        {openMenuId === patient.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                              <button
                                onClick={() => handleEdit(patient)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(patient)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-xs">Last Appointment : {patient.lastAppointment}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-xs">{patient.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
                  {isLoading ? 'Loading patients...' : 'No patients found.'}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={fetchPatients}
              disabled={isLoading}
              className="inline-flex items-center px-6 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Refresh
                  <RefreshCw className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handlePatientSubmit}
      />
    </div>
  );
};

export default PatientGrid;
