import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthProvider';
import toast from 'react-hot-toast';
import * as Sentry from '@sentry/browser';
import { FaSnowflake } from 'react-icons/fa';

const schema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  role: z.enum(['Tank', 'Marksman', 'Mage', 'Assassin', 'Support'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
});

export default function Register() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Registration data:", data);
      const profileData = {
        fullName: data.fullName,
        phone: data.phone,
        role: data.role,
      };
      
      await signup(data.email, data.password, profileData);
      toast.success('Account created successfully! You can now login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      Sentry.captureException(error);
      
      let errorMessage = 'Failed to create account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use. Please use a different email or login.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-8 border border-blue-900">
          <div className="text-center mb-6">
            <FaSnowflake className="text-5xl text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-blue-400">
              Join Frost Warlord Team
            </h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                {...register('fullName')}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                {...register('email')}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border"
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Your Role</label>
              <select
                {...register('role')}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border"
              >
                <option value="">Select your preferred role</option>
                <option value="Tank">Tank</option>
                <option value="Marksman">Marksman</option>
                <option value="Mage">Mage</option>
                <option value="Assassin">Assassin</option>
                <option value="Support">Support</option>
              </select>
              {errors.role && (
                <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Register'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 transition">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}