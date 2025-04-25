import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaSnowflake } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-blue-900 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
              <FaSnowflake className="mr-2" />
              Frost Warlord
            </h3>
            <p className="text-gray-300 mb-4">
              A professional Mobile Legends esports team dedicated to excellence in competitive gaming.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-400 hover:text-white transition">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-white transition">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-white transition">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-white transition">
                <FaDiscord size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-blue-400 transition">News</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-blue-400 transition">Join Our Team</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Contact</h3>
            <p className="text-gray-300 mb-2">Email: contact@frostwarlord.com</p>
            <p className="text-gray-300">Discord: discord.gg/frostwarlord</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Frost Warlord. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}