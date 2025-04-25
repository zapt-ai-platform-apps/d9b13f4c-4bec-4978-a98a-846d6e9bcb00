import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="mb-6">
        <img 
          src="https://img.mobilelegends.com/group1/M00/00/A4/Cq2IxmABh0SAMC19AAHkTHLRJO4413.png" 
          alt="Mobile Legends 404" 
          className="w-48 h-48 object-contain mx-auto"
        />
      </div>
      
      <FaExclamationTriangle className="text-5xl text-yellow-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
      <p className="text-xl text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center transition cursor-pointer">
        <FaArrowLeft className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
}