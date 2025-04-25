import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthProvider';
import { FaBars, FaTimes, FaUser, FaSnowflake } from 'react-icons/fa';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gray-800 border-b border-blue-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-400 flex items-center">
            <FaSnowflake className="mr-2" />
            Frost Warlord
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-blue-400' : 'text-white'} hover:text-blue-300 transition`}
            >
              Home
            </Link>
            <Link 
              to="/news" 
              className={`${isActive('/news') ? 'text-blue-400' : 'text-white'} hover:text-blue-300 transition`}
            >
              News
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`${isActive('/dashboard') ? 'text-blue-400' : 'text-white'} hover:text-blue-300 transition`}
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-white hover:text-blue-300 transition">
                    <FaUser className="mr-2" />
                    Profile
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-blue-900 rounded shadow-lg hidden group-hover:block z-10">
                    <Link to="/profile" className="block px-4 py-2 text-white hover:bg-gray-700 transition">Edit Profile</Link>
                    <Link to="/schedule" className="block px-4 py-2 text-white hover:bg-gray-700 transition">Schedule</Link>
                    <Link to="/chat" className="block px-4 py-2 text-white hover:bg-gray-700 transition">Team Chat</Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`${isActive('/login') ? 'text-blue-400' : 'text-white'} hover:text-blue-300 transition`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition cursor-pointer"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3">
            <Link 
              to="/" 
              className={`block ${isActive('/') ? 'text-blue-400' : 'text-white'} hover:text-blue-300 transition py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/news" 
              className={`block ${isActive('/news') ? 'text-blue-400' : 'text-white'} hover:text-blue-300 transition py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              News
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block ${isActive('/dashboard') ? 'text-blue-400' : 'text-white'} hover:text-blue-300 transition py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className={`block ${isActive('/profile') ? 'text-blue-400' : 'text-white'} hover:text-blue-300 transition py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/schedule" 
                  className={`block ${isActive('/schedule') ? 'text-blue-400' : 'text-white'} hover:text-blue-300 transition py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Schedule
                </Link>
                <Link 
                  to="/chat" 
                  className={`block ${isActive('/chat') ? 'text-blue-400' : 'text-white'} hover:text-blue-300 transition py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Team Chat
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-white hover:text-blue-300 transition py-2 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`block ${isActive('/login') ? 'text-blue-400' : 'text-white'} hover:text-blue-300 transition py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}