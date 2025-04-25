import React, { useEffect, useState } from 'react';
import { useAuth } from '../../modules/auth/AuthProvider';
import { format } from 'date-fns';
import { FaTrophy, FaCalendarAlt, FaUsers, FaUserCircle, FaChartLine } from 'react-icons/fa';
import * as Sentry from '@sentry/browser';

export default function Dashboard() {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Placeholder data for dashboard
  const upcomingMatches = [
    { id: 1, opponent: "Team Phoenix", date: new Date(2023, 6, 15, 19, 0), type: "Tournament" },
    { id: 2, opponent: "Dragon Squad", date: new Date(2023, 6, 18, 20, 0), type: "Scrimmage" },
    { id: 3, opponent: "Elite Warriors", date: new Date(2023, 6, 22, 19, 30), type: "Tournament" },
  ];

  const teamMembers = [
    { id: 1, name: "Alex Chen", role: "Tank", status: "Online" },
    { id: 2, name: "Maya Johnson", role: "Marksman", status: "Offline" },
    { id: 3, name: "Ryu Tanaka", role: "Assassin", status: "In Game" },
    { id: 4, name: "Sarah Wilson", role: "Mage", status: "Online" },
    { id: 5, name: "Carlos Rodriguez", role: "Support", status: "Offline" },
  ];

  const recentAchievements = [
    { id: 1, title: "City Tournament Champions", date: "June 5, 2023", prize: "$1,000" },
    { id: 2, title: "Regional Qualifier - 2nd Place", date: "May 20, 2023", prize: "$500" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Dashboard</h1>
        
        {/* Welcome Banner with ML Background */}
        <div className="relative rounded-lg overflow-hidden mb-8 bg-gray-800">
          <img 
            src="https://cdn.oneesports.gg/cdn-data/2022/05/MLBB_M3WorldChampionship_BlacklistInternational.jpg" 
            alt="Mobile Legends Tournament" 
            className="w-full h-48 object-cover opacity-30"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {userProfile?.fullName || currentUser?.email}!
            </h2>
            <p className="text-gray-300">
              Role: <span className="text-blue-400">{userProfile?.role || "Member"}</span> | 
              Joined: <span className="text-blue-400">
                {userProfile?.createdAt ? format(new Date(userProfile.createdAt), 'MMM dd, yyyy') : "Recently"}
              </span>
            </p>
            {userProfile?.favoriteHero && (
              <p className="text-gray-300 mt-1">
                Favorite Hero: <span className="text-blue-400">{userProfile.favoriteHero}</span>
              </p>
            )}
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex items-center">
            <div className="mr-4 bg-blue-500 bg-opacity-20 p-3 rounded">
              <FaChartLine className="text-2xl text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Win Rate</p>
              <p className="text-2xl font-bold">67%</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex items-center">
            <div className="mr-4 bg-green-500 bg-opacity-20 p-3 rounded">
              <FaTrophy className="text-2xl text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Tournaments</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex items-center">
            <div className="mr-4 bg-purple-500 bg-opacity-20 p-3 rounded">
              <FaUsers className="text-2xl text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Team Size</p>
              <p className="text-2xl font-bold">12 Members</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex items-center">
            <div className="mr-4 bg-orange-500 bg-opacity-20 p-3 rounded">
              <FaUserCircle className="text-2xl text-orange-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Your Level</p>
              <p className="text-2xl font-bold">{userProfile?.level || 1}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Matches */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Upcoming Matches</h3>
              <FaCalendarAlt className="text-blue-400" />
            </div>
            
            {upcomingMatches.map(match => (
              <div key={match.id} className="mb-4 border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{match.opponent}</h4>
                    <p className="text-blue-400 text-sm">{match.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300">{format(match.date, 'MMM dd')}</p>
                    <p className="text-gray-400 text-sm">{format(match.date, 'h:mm a')}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition cursor-pointer">
              View Full Schedule
            </button>
          </div>
          
          {/* Team Members */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Team Members</h3>
              <FaUsers className="text-blue-400" />
            </div>
            
            {teamMembers.map(member => (
              <div key={member.id} className="mb-4 border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-gray-400 text-sm">{member.role}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.status === 'Online' ? 'bg-green-900 text-green-300' :
                      member.status === 'In Game' ? 'bg-blue-900 text-blue-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition cursor-pointer">
              View All Members
            </button>
          </div>
          
          {/* Recent Achievements */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Recent Achievements</h3>
              <FaTrophy className="text-yellow-400" />
            </div>
            
            {recentAchievements.map(achievement => (
              <div key={achievement.id} className="mb-6 last:mb-0">
                <div className="bg-gray-700 rounded-lg p-4 relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="font-semibold text-lg">{achievement.title}</h4>
                    <p className="text-gray-300 text-sm mb-2">{achievement.date}</p>
                    <p className="text-yellow-400 font-bold">Prize: {achievement.prize}</p>
                  </div>
                  <div className="absolute top-0 right-0 mt-2 mr-2">
                    <FaTrophy className="text-yellow-400 opacity-10 text-4xl" />
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-4 text-center">
              <div className="bg-gray-700 rounded-lg p-4">
                <img 
                  src="https://cdn.oneesports.gg/cdn-data/2021/12/MobileLegends_M3WorldChampionship_Trophy.jpg" 
                  alt="Tournament Trophy" 
                  className="h-40 mx-auto object-contain rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}