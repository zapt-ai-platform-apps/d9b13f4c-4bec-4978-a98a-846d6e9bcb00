import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle, FaSnowflake } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="container mx-auto px-4 text-center">
        <FaSnowflake className="text-6xl text-blue-400 mx-auto mb-2" />
        <FaExclamationTriangle className="text-4xl text-blue-300 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-blue-400 mb-6">Page Not Found</h2>
        <p className="text-gray-300 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition cursor-pointer"
        >
          <FaHome className="mr-2" />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}