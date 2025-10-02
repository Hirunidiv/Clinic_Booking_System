import React, { useState } from 'react';
import { Search, SlidersHorizontal, Bell } from 'lucide-react';

const AdminNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Search Section */}
          <div className="flex-1 flex items-center max-w-2xl">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Filter"
                >
                  <SlidersHorizontal className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Notification & Profile */}
          <div className="flex items-center space-x-4 ml-4">
            {/* Notification Bell */}
            <button
              onClick={handleNotificationClick}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6 text-gray-600" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Profile Avatar */}
            <button
              onClick={handleProfileClick}
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full"
              aria-label="User menu"
            >
              <img
                className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 hover:border-red-500 transition-colors"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User profile"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;