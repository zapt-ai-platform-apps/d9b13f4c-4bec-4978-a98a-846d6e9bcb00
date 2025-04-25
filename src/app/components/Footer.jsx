import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaDiscord, FaEnvelope, FaSnowflake } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center text-2xl font-bold text-white mb-4">
              <FaSnowflake className="text-blue-400 mr-2 text-3xl" />
              <span>Frost Warlord</span>
            </Link>
            <p className="text-gray-400 mb-4">
              A competitive Mobile Legends team dedicated to excellence in esports.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <FaYoutube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <FaDiscord size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-blue-400 transition">News</Link>
              </li>
              <li>
                <Link to="/schedule" className="text-gray-400 hover:text-blue-400 transition">Schedule</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-blue-400 transition">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-blue-400 transition">Register</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://m.mobilelegends.com/" className="text-gray-400 hover:text-blue-400 transition" target="_blank" rel="noopener noreferrer">
                  Official Mobile Legends
                </a>
              </li>
              <li>
                <a href="https://liquipedia.net/mobilelegends/" className="text-gray-400 hover:text-blue-400 transition" target="_blank" rel="noopener noreferrer">
                  ML Esports Wiki
                </a>
              </li>
              <li>
                <a href="https://www.oneesports.gg/mobile-legends/" className="text-gray-400 hover:text-blue-400 transition" target="_blank" rel="noopener noreferrer">
                  ML News & Updates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                  Tournaments
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">
              Have questions? Reach out to us!
            </p>
            <a href="mailto:contact@frostwarlord.com" className="flex items-center text-gray-400 hover:text-blue-400 transition mb-4">
              <FaEnvelope className="mr-2" />
              contact@frostwarlord.com
            </a>
            
            <img 
              src="https://cdn.oneesports.gg/cdn-data/2022/10/MobileLegends_M4WorldChampionship_trophy_logo.jpg" 
              alt="Mobile Legends Tournament" 
              className="h-20 object-contain mt-2"
            />
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Frost Warlord Esports. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition">
              Terms of Service
            </a>
            <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 text-sm transition">
              Made on ZAPT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}