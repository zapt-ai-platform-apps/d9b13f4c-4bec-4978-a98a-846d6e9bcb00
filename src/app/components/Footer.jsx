import React from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaYoutube, FaInstagram, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Frost Warlord</h3>
            <p className="mb-4">
              Tim esports Mobile Legends profesional yang berdedikasi untuk mencapai kesuksesan kompetitif.
            </p>
            <div className="flex space-x-4">
              <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                <FaDiscord size={24} />
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                <FaYoutube size={24} />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Tautan</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400 transition">Beranda</Link></li>
              <li><Link to="/news" className="hover:text-blue-400 transition">Berita</Link></li>
              <li><Link to="/schedule" className="hover:text-blue-400 transition">Jadwal</Link></li>
              <li><Link to="/register" className="hover:text-blue-400 transition">Daftar</Link></li>
              <li><Link to="/login" className="hover:text-blue-400 transition">Masuk</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Kontak Kami</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-400 mr-2 mt-1" />
                <p>
                  Dusun Krete III, Desa Siwarak RT 02 RW 010
                </p>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="text-blue-400 mr-2" />
                <p>085934814715</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Frost Warlord. Semua Hak Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}