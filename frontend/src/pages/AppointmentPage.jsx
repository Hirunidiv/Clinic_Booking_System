import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus,
  Search,
  Calendar,
  Filter,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import AdminSideBar from '../components/AdminSideBar';
import AdminNavbar from '../components/Navbar';
import AddAppointment from '../components/AddAppointment';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:4000/api/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'BOOKED':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'CANCELED':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'COMPLETED':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // ✅ Handle new appointment added
  const handleAppointmentAdded = (newAppointment) => {
    setAppointments([newAppointment, ...appointments]);
    setIsModalOpen(false);
  };

  // ✅ Filter and paginate results
  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.doctor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSideBar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Export
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-[#2E37A4] hover:bg-[#252d8a] text-white font-medium text-sm rounded-lg transition-colors duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </button>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E37A4] focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
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

          {/* Loading & Error */}
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading appointments...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : paginatedAppointments.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No appointments found.</div>
          ) : (
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
                        Status
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedAppointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(appointment.appointmentDateTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.patient?.name || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">{appointment.patient?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.doctor?.name || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {appointment.doctor?.specialization}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                              appointment.status
                            )}`}
                          >
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
                                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    View
                                  </button>
                                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    Edit
                                  </button>
                                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
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
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-6">
              <AddAppointment onAppointmentAdded={handleAppointmentAdded} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;