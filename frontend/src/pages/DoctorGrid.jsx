import React, { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import AdminSideBar from '../components/AdminSideBar';
import AdminNavbar from '../components/Navbar';
// import AdminNavbar from '../components/AdminNavbar';

const DoctorGrid = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Mick Thompson",
      specialty: "Cardiologist",
      availability: "Mon, 20 Jan 2025",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      specialty: "Orthopedic Surgeon",
      availability: "Wed, 22 Jan 2025",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Dr. Emily Carter",
      specialty: "Pediatrician",
      availability: "Fri, 24 Jan 2025",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Dr. David Lee",
      specialty: "Gynecologist",
      availability: "Tue, 21 Jan 2025",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Dr. Anna Kim",
      specialty: "Psychiatrist",
      availability: "Mon, 27 Jan 2025",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Dr. John Smith",
      specialty: "Neurologist",
      availability: "Thu, 23 Jan 2025",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop"
    },
    {
      id: 7,
      name: "Dr. Lisa White",
      specialty: "Oncologist",
      availability: "Sat, 25 Jan 2025",
      image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop"
    },
    {
      id: 8,
      name: "Dr. Patricia Brown",
      specialty: "Pulmonologist",
      availability: "Sun, 01 Feb 2025",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop"
    },
    {
      id: 9,
      name: "Dr. Rachel Green",
      specialty: "Urologist",
      availability: "Tue, 28 Jan 2025",
      image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop"
    },
    {
      id: 10,
      name: "Dr. Michael Smith",
      specialty: "Cardiologist",
      availability: "Thu, 05 Feb 2025",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop"
    },
    {
      id: 11,
      name: "Dr. Sarah Johnson",
      specialty: "Surgeon",
      availability: "Mon, 09 Feb 2025",
      image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop"
    },
    {
      id: 12,
      name: "Dr. Adrian White",
      specialty: "Practitioner",
      availability: "Sat, 25 Jan 2025",
      image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=400&fit=crop"
    },
    {
      id: 13,
      name: "Dr. Ken Clark",
      specialty: "Dermatologist",
      availability: "Wed, 12 Feb 2025",
      image: "https://images.unsplash.com/photo-1630963142243-dbf2116a0037?w=400&h=400&fit=crop"
    },
    {
      id: 14,
      name: "Dr. Oliver King",
      specialty: "Orthopedist",
      availability: "Fri, 14 Feb 2025",
      image: "https://images.unsplash.com/photo-1613521541190-7e1ecd6c2b76?w=400&h=400&fit=crop"
    },
    {
      id: 15,
      name: "Dr. Avan Davis",
      specialty: "Endocrinologist",
      availability: "Tue, 17 Feb 2025",
      image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&h=400&fit=crop"
    }
  ]);

  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (doctor) => {
    console.log('Edit doctor:', doctor);
    setOpenMenuId(null);
  };

  const handleDelete = (doctor) => {
    console.log('Delete doctor:', doctor);
    setDoctors(doctors.filter(d => d.id !== doctor.id));
    setOpenMenuId(null);
  };

  const handleAddDoctor = () => {
    console.log('Add new doctor');
  };

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
                Total Doctors : 565
              </span>
            </div>
            <button 
              onClick={handleAddDoctor}
              className="inline-flex items-center px-4 py-2 bg-[#2E37A4] hover:bg-[#252d8a] text-white font-medium text-sm rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Doctor
            </button>
          </div>

          {/* Doctor Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div 
                key={doctor.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {doctor.specialty}
                        </p>
                        <p className="text-xs text-gray-400">
                          Available : {doctor.availability}
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
                              onClick={() => handleEdit(doctor)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(doctor)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
    </div>
  );
};

export default DoctorGrid;