import React, { useState } from 'react';
import { Plus, Search, Calendar, Filter, ChevronDown, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminSideBar from '../components/AdminSideBar';
import AdminNavbar from '../components/Navbar';


const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      dateTime: "30 Apr 2025 - 09:30 AM",
      patient: {
        name: "Alberto Ripley",
        phone: "+1 56556 54565",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      },
      doctor: {
        name: "Dr. Mick Thompson",
        specialty: "Cardiologist",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop"
      },
      mode: "In-person",
      status: "Checked Out"
    },
    {
      id: 2,
      dateTime: "15 Apr 2025 - 11:20 AM",
      patient: {
        name: "Susan Babin",
        phone: "+1 65658 95654",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
      },
      doctor: {
        name: "Dr. Sarah Johnson",
        specialty: "Orthopedic Surgeon",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop"
      },
      mode: "Online",
      status: "Checked In"
    },
    {
      id: 3,
      dateTime: "02 Apr 2025 - 08:15 AM",
      patient: {
        name: "Carol Lam",
        phone: "+1 55654 56647",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
      },
      doctor: {
        name: "Dr. Emily Carter",
        specialty: "Pediatrician",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop"
      },
      mode: "In-Person",
      status: "Cancelled"
    },
    {
      id: 4,
      dateTime: "27 Mar 2025 - 02:00 PM",
      patient: {
        name: "Marsha Noland",
        phone: "+1 65658 54558",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
      },
      doctor: {
        name: "Dr. David Lee",
        specialty: "Gynecologist",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop"
      },
      mode: "Online",
      status: "Schedule"
    },
    {
      id: 5,
      dateTime: "12 Mar 2025 - 05:40 PM",
      patient: {
        name: "Irma Armstrong",
        phone: "+1 45214 66568",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop"
      },
      doctor: {
        name: "Dr. Anna Kim",
        specialty: "Psychiatrist",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
      },
      mode: "Online",
      status: "Confirmed"
    },
    {
      id: 6,
      dateTime: "05 Mar 2025 - 11:15 AM",
      patient: {
        name: "Jesus Adams",
        phone: "+1 41254 45214",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
      },
      doctor: {
        name: "Dr. John Smith",
        specialty: "Neurosurgeon",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&h=100&fit=crop"
      },
      mode: "Online",
      status: "Confirmed"
    },
    {
      id: 7,
      dateTime: "24 Feb 2025 - 09:20 AM",
      patient: {
        name: "Ezra Belcher",
        phone: "+1 65895 41247",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
      },
      doctor: {
        name: "Dr. Lisa White",
        specialty: "Oncologist",
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=100&h=100&fit=crop"
      },
      mode: "In-Person",
      status: "Cancelled"
    },
    {
      id: 8,
      dateTime: "16 Feb 2025 - 11:40 AM",
      patient: {
        name: "Glen Lentz",
        phone: "+1 62458 45945",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
      },
      doctor: {
        name: "Dr. Patricia Brown",
        specialty: "Pulmonologist",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop"
      },
      mode: "Online",
      status: "Confirmed"
    },
    {
      id: 9,
      dateTime: "01 Feb 2025 - 04:00 PM",
      patient: {
        name: "Bernard Griffith",
        phone: "+1 61422 45214",
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop"
      },
      doctor: {
        name: "Dr. Rachel Green",
        specialty: "Urologist",
        image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=100&h=100&fit=crop"
      },
      mode: "Online",
      status: "Checked Out"
    },
    {
      id: 10,
      dateTime: "25 Jan 2025 - 03:10 PM",
      patient: {
        name: "John Elsass",
        phone: "+1 47851 26371",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop"
      },
      doctor: {
        name: "Dr. Michael Smith",
        specialty: "Cardiologist",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop"
      },
      mode: "Online",
      status: "Schedule"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(2);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [openMenuId, setOpenMenuId] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Checked Out':
        return 'text-cyan-600 bg-cyan-50 border-cyan-200';
      case 'Checked In':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Cancelled':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Schedule':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Confirmed':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSideBar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Appointment</h1>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Export
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-[#2E37A4] hover:bg-[#252d8a] text-white font-medium text-sm rounded-lg transition-colors duration-200">
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E37A4] focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4 mr-2" />
                27 May 2025 - 02 Jun 2025
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Sort By : Recent
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mode
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.dateTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={appointment.patient.image}
                            alt={appointment.patient.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.patient.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {appointment.patient.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={appointment.doctor.image}
                            alt={appointment.doctor.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.doctor.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {appointment.doctor.specialty}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.mode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="relative">
                          <button
                            onClick={() => toggleMenu(appointment.id)}
                            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                          </button>
                          {openMenuId === appointment.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenMenuId(null)}
                              />
                              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                  View
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                  Edit
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E37A4] focus:border-transparent"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-700">Results</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
                1
              </button>
              <button className="px-3 py-1 bg-[#2E37A4] text-white rounded-md text-sm">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
                12
              </button>
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;