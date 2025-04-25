import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthProvider';
import toast from 'react-hot-toast';
import * as Sentry from '@sentry/browser';
import { FaSnowflake } from 'react-icons/fa';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
});

export default function ForgotPassword() {
  const { resetPassword, clearAuthError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Clear form when unmounting
  useEffect(() => {
    clearAuthError();
    return () => reset();
  }, [clearAuthError, reset]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      console.log("Sending password reset email to:", data.email);
      await resetPassword(data.email);
      setEmailSent(true);
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Reset password error:', error);
      Sentry.captureException(error);
      
      let errorMessage = 'Failed to send password reset email.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account exists with this email.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
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
              Reset Password
            </h2>
          </div>
          
          <div className="mb-6">
            <img 
              src="https://gamebastion.com/blog/wp-content/uploads/2023/05/Mobile-Legends-Heroes.jpg" 
              alt="Mobile Legends Characters" 
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
          
          {emailSent ? (
            <div className="text-center space-y-6">
              <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg border border-blue-500">
                <p className="text-blue-300 text-lg mb-2">Password Reset Email Sent!</p>
                <p className="text-gray-300">
                  Check your email inbox and follow the instructions to reset your password.
                </p>
              </div>
              
              <div>
                <Link to="/login" className="text-blue-400 hover:text-blue-300 transition">
                  ← Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-300 mb-6">
                Enter the email address associated with your account, and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      Sending...
                    </span>
                  ) : 'Send Reset Email'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Remember your password?{' '}
                  <Link to="/login" className="text-blue-400 hover:text-blue-300 transition">
                    Login
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}