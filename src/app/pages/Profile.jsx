import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../modules/auth/AuthProvider';
import toast from 'react-hot-toast';
import * as Sentry from '@sentry/browser';
import { FaUserCircle, FaTrophy, FaMedal, FaStar } from 'react-icons/fa';

const heroOptions = [
  { value: "", label: "Select your favorite hero" },
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

// Schema for profile form
const profileSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  role: z.enum(['Tank', 'Marksman', 'Mage', 'Assassin', 'Support'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
  favoriteHero: z.string().optional(),
  bio: z.string().max(200, 'Bio must be under 200 characters').optional().or(z.literal('')),
});

export default function Profile() {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isDirty } 
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      role: '',
      favoriteHero: '',
      bio: '',
    }
  });

  // Initialize form with user data
  useEffect(() => {
    if (userProfile) {
      reset({
        fullName: userProfile.fullName || '',
        phone: userProfile.phone || '',
        role: userProfile.role || '',
        favoriteHero: userProfile.favoriteHero || '',
        bio: userProfile.bio || '',
      });
      setIsLoading(false);
    }
  }, [userProfile, reset]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await updateUserProfile(data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      Sentry.captureException(error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const achievements = [
    { id: 1, title: "First Blood King", description: "Got first blood in 5 consecutive matches", icon: <FaTrophy className="text-yellow-400" /> },
    { id: 2, title: "Team Player", description: "Participated in 10 team tournaments", icon: <FaMedal className="text-blue-400" /> },
    { id: 3, title: "Rising Star", description: "Improved win rate by 15% in one month", icon: <FaStar className="text-purple-400" /> },
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <div className="relative h-40">
                <img 
                  src="https://rare-gallery.com/thumbs/536999-Mobile-Legends.jpg" 
                  alt="Profile background" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-end">
                  <FaUserCircle className="text-6xl text-blue-400" />
                  <div className="ml-3">
                    <h2 className="text-xl font-bold">{userProfile?.fullName}</h2>
                    <p className="text-blue-400">{userProfile?.role || "Team Member"}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <p className="text-gray-300">Email</p>
                  <p className="font-medium">{currentUser?.email}</p>
                </div>
                
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <p className="text-gray-300">Phone</p>
                  <p className="font-medium">{userProfile?.phone || "Not provided"}</p>
                </div>
                
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <p className="text-gray-300">Favorite Hero</p>
                  <p className="font-medium">{userProfile?.favoriteHero || "Not selected"}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-300">Bio</p>
                  <p className="italic">{userProfile?.bio || "No bio provided"}</p>
                </div>
              </div>
            </div>
            
            {/* Achievements */}
            <div className="mt-6 bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Your Achievements</h3>
              
              {achievements.map(achievement => (
                <div key={achievement.id} className="flex items-start mb-4 pb-4 border-b border-gray-700 last:border-b-0 last:pb-0">
                  <div className="mt-1 mr-3">
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Edit Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6">Edit Profile</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      {...register('fullName')}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border"
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
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
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
                
                <div>
                  <label className="block text-gray-300 mb-2">Bio (max 200 characters)</label>
                  <textarea
                    {...register('bio')}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border min-h-[100px]"
                    placeholder="Tell us about yourself"
                    disabled={isSubmitting}
                  />
                  {errors.bio && (
                    <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isDirty}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Mobile Legends Stats */}
            <div className="mt-6 bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Mobile Legends Stats</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">Matches</p>
                  <p className="text-2xl font-bold">248</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">Win Rate</p>
                  <p className="text-2xl font-bold text-green-400">67%</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">MVP Rate</p>
                  <p className="text-2xl font-bold text-yellow-400">31%</p>
                </div>
              </div>
              
              <h4 className="font-bold mb-3">Most Used Heroes</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-700 p-3 rounded-lg flex items-center">
                  <img 
                    src="https://static.wikia.nocookie.net/mobile-legends/images/e/ec/Chou.png"
                    alt="Chou"
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <p className="font-semibold">Chou</p>
                    <p className="text-sm text-blue-400">Fighter</p>
                  </div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg flex items-center">
                  <img 
                    src="https://static.wikia.nocookie.net/mobile-legends/images/c/c8/Hero-Gusion.png"
                    alt="Gusion"
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <p className="font-semibold">Gusion</p>
                    <p className="text-sm text-red-400">Assassin</p>
                  </div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg flex items-center">
                  <img 
                    src="https://static.wikia.nocookie.net/mobile-legends/images/a/af/Hero-Tigreal.png"
                    alt="Tigreal"
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <p className="font-semibold">Tigreal</p>
                    <p className="text-sm text-gray-400">Tank</p>
                  </div>
                </div>
              </div>
              
              <img 
                src="https://cdn1.dotesports.com/wp-content/uploads/2021/05/07080821/ML-1.jpg" 
                alt="Mobile Legends Battle" 
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}