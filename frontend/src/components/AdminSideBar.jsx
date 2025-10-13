import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  UserCheck, 
  CalendarCheck2, 
  UserCog,
  MessagesSquare,
  Menu,
  X,
  LogOut
} from 'lucide-react';

const AdminSideBar = ({ navigateTo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      active: true,
      page: '/dashboard'
    },
    {
      icon: UserPlus,
      label: 'Doctors',
      active: false,
      page: '/doctors'
    },
    {
      icon: UserCheck,
      label: 'Patients',
      active: false,
      page: '/patients'
    },
    {
      icon: CalendarCheck2,
      label: 'Appointment',
      active: false,
      page: '/appointments'
    },
    {
      icon: UserCog,
      label: 'Services',
      active: false,
      page: '/services'
    },
    {
      icon: MessagesSquare,
      label: 'Messages',
      active: false,
      page: '/messages'
    }
  ];

  const navigate = useNavigate();

  const handleNavigation = (page) => {
    if (page === '/signin') {
      // Handle logout - clear localStorage and navigate to signin
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('currentPage');
      navigate('/signin');
      setIsMobileMenuOpen(false);
      return;
    }

    if (navigateTo) {
      navigateTo(page);
    }

    // navigate to the route path
    if (page) {
      navigate(page);
    }

    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md hover:bg-gray-50 transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* AdminSideBar */}
      <aside className={`
        fixed lg:static
        top-0 left-0 z-40
        w-64 h-screen lg:h-auto lg:min-h-full
        bg-white
        border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full lg:h-auto lg:min-h-full">
          {/* Header */}
          <div className="flex items-center px-6 py-6 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <img src='/logo/logo.png' className='w-8 h-8 object-cover'/>
              <span className="text-xl font-semibold text-gray-800">
                Preclinic
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <Link
                      to={item.page}
                      className={`
                        flex items-center px-4 py-3 text-sm font-medium rounded-lg
                        transition-colors duration-200
                        ${item.active 
                          ? 'bg-[#2E37A4] text-white' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className={`
                        w-5 h-5 mr-3
                        ${item.active ? 'text-white' : 'text-gray-400'}
                      `} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            {/* Logout Button */}
            <div className="mt-8">
              <button
                type="button"
                className="w-full text-left flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                onClick={() => handleNavigation('/signin')}
              >
                <LogOut className="w-5 h-5 mr-3 text-gray-400" />
                Logout
              </button>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSideBar;