import React, { useState } from 'react';
import { Plus, MoreVertical, Calendar, MapPin, RefreshCw } from 'lucide-react';
import AdminSideBar from '../components/AdminSideBar';
import AdminNavbar from '../components/Navbar';
import AddPatientModal from '../components/AddPatient';

const PatientGrid = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Ezra Belcher",
      age: 28,
      gender: "Male",
      lastAppointment: "Sat, 24 Feb 2025",
      location: "Kurunegala",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Glen Lentz",
      age: 22,
      gender: "Male",
      lastAppointment: "Sat, 16 Feb 2025",
      location: "Kurunegala",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Bernard Griffith",
      age: 34,
      gender: "Male",
      lastAppointment: "Tue, 01 Feb 2025",
      location: "Kurunegala",
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "John Elsass",
      age: 23,
      gender: "Male",
      lastAppointment: "Mon, 25 Jan 2025",
      location: "Malabe",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Martin Lisa",
      age: 26,
      gender: "Female",
      lastAppointment: "Thu, 22 Jan 2025",
      location: "Malabe",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Ava Mitchell",
      age: 25,
      gender: "Female",
      lastAppointment: "Sat, 18 Jan 2025",
      location: "Malabe",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      id: 7,
      name: "Noah Davis",
      age: 32,
      gender: "Male",
      lastAppointment: "Wed, 15 Jan 2025",
      location: "Malabe",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
      id: 8,
      name: "Emily Ross",
      age: 29,
      gender: "Female",
      lastAppointment: "Fri, 10 Jan 2025",
      location: "Malabe",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop"
    },
    {
      id: 9,
      name: "Ryan Anderson",
      age: 30,
      gender: "Male",
      lastAppointment: "Tue, 04 Jan 2025",
      location: "Malabe",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    }
  ]);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (patient) => {
    console.log('Edit patient:', patient);
    setOpenMenuId(null);
  };

  const handleDelete = (patient) => {
    console.log('Delete patient:', patient);
    setPatients(patients.filter(d => d.id !== patient.id));
    setOpenMenuId(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPatient = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePatientSubmit = (patientData) => {
    console.log('New patient data:', patientData);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
            {patients.map((patient) => (
              <div 
                key={patient.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={patient.image}
                        alt={patient.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base mb-1">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {patient.age}, {patient.gender}
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
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
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
                  Load More
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