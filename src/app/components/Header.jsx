import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../modules/auth/AuthProvider';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=512&height=512" 
                alt="Frost Warlord Logo" 
                className="h-10 w-10 mr-2"
              />
              <span className="text-white text-xl font-bold">Frost Warlord</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition">Beranda</Link>
            <Link to="/news" className="text-gray-300 hover:text-white transition">Berita</Link>
            <Link to="/schedule" className="text-gray-300 hover:text-white transition">Jadwal</Link>
            
            {currentUser ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
                <Link to="/chat" className="text-gray-300 hover:text-white transition">Chat</Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-300 hover:text-white">
                    <FaUser className="mr-1" size={16} />
                    <span>Profil</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Profil Saya
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                    >
                      <div className="flex items-center">
                        <FaSignOutAlt className="mr-2" />
                        <span>Keluar</span>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition cursor-pointer"
                >
                  Masuk
                </Link>
                <Link 
                  to="/register" 
                  className="text-white bg-transparent border border-blue-600 hover:bg-blue-900 px-4 py-2 rounded transition cursor-pointer"
                >
                  Daftar
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 pb-4">
          <div className="container mx-auto px-4 space-y-2">
            <Link 
              to="/" 
              className="block py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link 
              to="/news" 
              className="block py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Berita
            </Link>
            <Link 
              to="/schedule" 
              className="block py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Jadwal
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/chat" 
                  className="block py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Chat
                </Link>
                <Link 
                  to="/profile" 
                  className="block py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profil Saya
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="w-full text-left flex items-center py-2 text-gray-300 hover:text-white cursor-pointer"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span>Keluar</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link 
                  to="/login" 
                  className="text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link 
                  to="/register" 
                  className="text-center text-white bg-transparent border border-blue-600 hover:bg-blue-900 px-4 py-2 rounded transition cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}