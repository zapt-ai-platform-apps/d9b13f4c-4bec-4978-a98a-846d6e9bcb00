import React, { useState, useEffect } from 'react';
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
  favoriteHero: z.string().optional(),
});

const heroOptions = [
  { value: "", label: "Select your favorite hero (optional)" },
  { value: "Layla", label: "Layla" },
  { value: "Miya", label: "Miya" },
  { value: "Balmond", label: "Balmond" },
  { value: "Tigreal", label: "Tigreal" },
  { value: "Alucard", label: "Alucard" },
  { value: "Zilong", label: "Zilong" },
  { value: "Nana", label: "Nana" },
  { value: "Eudora", label: "Eudora" },
  { value: "Saber", label: "Saber" },
  { value: "Gusion", label: "Gusion" },
  { value: "Chou", label: "Chou" },
  { value: "Kagura", label: "Kagura" },
  { value: "Fanny", label: "Fanny" },
  { value: "Lancelot", label: "Lancelot" },
];

export default function Register() {
  const { signup, currentUser, clearAuthError } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      favoriteHero: ""
    }
  });

  // Clear form when unmounting
  useEffect(() => {
    clearAuthError();
    return () => reset();
  }, [clearAuthError, reset]);
  
  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      console.log("Registration data:", data);
      const profileData = {
        fullName: data.fullName,
        phone: data.phone,
        role: data.role,
        favoriteHero: data.favoriteHero || null,
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
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
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
          
          <div className="mb-6">
            <img 
              src="https://staticg.sportskeeda.com/editor/2023/05/38bfe-16839079359156-1920.jpg" 
              alt="Mobile Legends Heroes Lineup" 
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <p className="text-center text-gray-400 text-sm">Join our community of Mobile Legends players!</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                {...register('fullName')}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border"
                placeholder="Enter your full name"
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Your Role</label>
                <select
                  {...register('role')}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border"
                  disabled={isSubmitting}
                >
                  <option value="">Select your role</option>
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
              
              <div>
                <label className="block text-gray-300 mb-2">Favorite Hero</label>
                <select
                  {...register('favoriteHero')}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border"
                  disabled={isSubmitting}
                >
                  {heroOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
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
                  Creating account...
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