import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthProvider';
import { FaSnowflake, FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaNewspaper, FaCalendarAlt, FaComments, FaHome, FaTachometerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: <FaHome className="mr-2" /> },
    { label: 'News', path: '/news', icon: <FaNewspaper className="mr-2" /> },
  ];

  const authenticatedItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt className="mr-2" /> },
    { label: 'Schedule', path: '/schedule', icon: <FaCalendarAlt className="mr-2" /> },
    { label: 'Chat', path: '/chat', icon: <FaComments className="mr-2" /> },
    { label: 'Profile', path: '/profile', icon: <FaUserCircle className="mr-2" /> },
  ];

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center text-2xl font-bold text-white">
            <FaSnowflake className="text-blue-400 mr-2 text-3xl" />
            <span className="hidden sm:inline">Frost Warlord</span>
            <span className="inline sm:hidden">FW</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Navigation Links */}
            <ul className="flex space-x-1">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="px-4 py-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition flex items-center"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
              
              {currentUser && authenticatedItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="px-4 py-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition flex items-center"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth Buttons */}
            <div className="ml-4 flex items-center space-x-2">
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition flex items-center cursor-pointer"
                >
                  {isLoggingOut ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging out...
                    </span>
                  ) : (
                    <>
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </>
                  )}
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer">
                    Login
                  </Link>
                  <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition cursor-pointer">
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Navigation Links */}
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition flex items-center"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            {currentUser && authenticatedItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition flex items-center"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="pt-4 pb-2 border-t border-gray-700">
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md transition flex items-center cursor-pointer"
                >
                  {isLoggingOut ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging out...
                    </span>
                  ) : (
                    <>
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </>
                  )}
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block text-center text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition cursor-pointer"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}