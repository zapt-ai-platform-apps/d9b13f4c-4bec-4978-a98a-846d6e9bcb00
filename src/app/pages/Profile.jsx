import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../modules/auth/AuthProvider';
import { db, storage } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';
import { FaUser, FaUpload, FaSnowflake } from 'react-icons/fa';
import * as Sentry from '@sentry/browser';

const schema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  role: z.enum(['Tank', 'Marksman', 'Mage', 'Assassin', 'Support'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }).optional(),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
});

export default function Profile() {
  const { currentUser, userProfile, fetchUserProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: userProfile?.fullName || '',
      phone: userProfile?.phone || '',
      role: userProfile?.role || '',
      bio: userProfile?.bio || '',
    }
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!profileImage) return null;
    
    const storageRef = ref(storage, `profileImages/${currentUser.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, profileImage);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Error uploading image:', error);
          Sentry.captureException(error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Updating profile with data:", data);
      let imageUrl = userProfile?.imageUrl || null;
      
      if (profileImage) {
        imageUrl = await uploadImage();
      }
      
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        ...data,
        imageUrl,
        updatedAt: new Date().toISOString(),
      });
      
      await fetchUserProfile(currentUser.uid);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Sentry.captureException(error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
      setProfileImage(null);
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <FaSnowflake className="text-3xl text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-blue-400">Edit Your Profile</h1>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-blue-900">
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gray-700 mb-4 overflow-hidden border-4 border-blue-700 flex items-center justify-center">
                {userProfile?.imageUrl ? (
                  <img 
                    src={userProfile.imageUrl} 
                    alt={userProfile.fullName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-6xl text-gray-400" />
                )}
              </div>
              
              <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer transition flex items-center">
                <FaUpload className="mr-2" />
                <span>Upload Photo</span>
                <input 
                  type="file" 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </label>
              
              {profileImage && (
                <p className="text-sm text-gray-300 mt-2">
                  Selected: {profileImage.name}
                </p>
              )}
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full max-w-xs bg-gray-700 rounded-full mt-2">
                  <div 
                    className="bg-blue-600 text-xs text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {Math.round(uploadProgress)}%
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile Form */}
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
                <label className="block text-gray-300 mb-2">Role</label>
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
              
              <div>
                <label className="block text-gray-300 mb-2">Bio</label>
                <textarea
                  {...register('bio')}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border resize-none h-32"
                  placeholder="Write a short bio about yourself"
                ></textarea>
                {errors.bio && (
                  <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>
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
                ) : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}