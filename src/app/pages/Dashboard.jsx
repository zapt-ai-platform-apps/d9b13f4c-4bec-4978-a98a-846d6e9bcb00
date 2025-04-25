import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthProvider';
import { db } from '../../firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { FaCalendarAlt, FaComments, FaTrophy, FaUser, FaSnowflake } from 'react-icons/fa';
import * as Sentry from '@sentry/browser';

export default function Dashboard() {
  const { currentUser, userProfile } = useAuth();
  const [recentSchedules, setRecentSchedules] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching dashboard data for user:", currentUser?.uid);
        
        // Fetch upcoming schedules
        const scheduleQuery = query(
          collection(db, "schedules"),
          where("date", ">=", new Date().toISOString().split('T')[0]),
          orderBy("date"),
          limit(3)
        );
        
        const scheduleSnapshot = await getDocs(scheduleQuery);
        const scheduleData = scheduleSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentSchedules(scheduleData);
        
        // Fetch upcoming matches
        const matchesQuery = query(
          collection(db, "matches"),
          where("date", ">=", new Date().toISOString().split('T')[0]),
          orderBy("date"),
          limit(3)
        );
        
        const matchesSnapshot = await getDocs(matchesQuery);
        const matchesData = matchesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUpcomingMatches(matchesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

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
        <div className="flex items-center mb-8">
          <FaSnowflake className="text-3xl text-blue-400 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-blue-400">
              Welcome back, {userProfile?.fullName || 'Team Member'}!
            </h1>
            <p className="text-gray-300">
              Here's an overview of your upcoming activities and team updates.
            </p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content Area - 2 columns on medium screens */}
          <div className="md:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-blue-900">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-blue-400 text-2xl mr-3" />
                  <div>
                    <h3 className="text-gray-400 text-sm">Upcoming Practice</h3>
                    <p className="text-white font-semibold">
                      {recentSchedules.length > 0 
                        ? new Date(recentSchedules[0].date).toLocaleDateString() 
                        : 'No practice scheduled'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-blue-900">
                <div className="flex items-center">
                  <FaTrophy className="text-blue-400 text-2xl mr-3" />
                  <div>
                    <h3 className="text-gray-400 text-sm">Next Match</h3>
                    <p className="text-white font-semibold">
                      {upcomingMatches.length > 0 
                        ? upcomingMatches[0].opponent 
                        : 'No matches scheduled'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-blue-900">
                <div className="flex items-center">
                  <FaUser className="text-blue-400 text-2xl mr-3" />
                  <div>
                    <h3 className="text-gray-400 text-sm">Your Role</h3>
                    <p className="text-white font-semibold">{userProfile?.role || 'Not set'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-blue-900">
                <div className="flex items-center">
                  <FaComments className="text-blue-400 text-2xl mr-3" />
                  <div>
                    <h3 className="text-gray-400 text-sm">Team Chat</h3>
                    <Link to="/chat" className="text-white font-semibold hover:text-blue-400 transition">
                      Open Chat
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Schedule */}
            <div className="bg-gray-800 p-6 rounded-lg border border-blue-900">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Upcoming Practice Sessions</h2>
                <Link to="/schedule" className="text-blue-400 hover:text-blue-300 text-sm transition">
                  View All
                </Link>
              </div>
              
              {recentSchedules.length > 0 ? (
                <div className="space-y-4">
                  {recentSchedules.map(schedule => (
                    <div key={schedule.id} className="bg-gray-700 p-4 rounded">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-white font-medium">{schedule.title}</h3>
                          <p className="text-gray-400 text-sm">{schedule.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">{new Date(schedule.date).toLocaleDateString()}</p>
                          <p className="text-gray-400 text-sm">{schedule.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-700 p-4 rounded text-center">
                  <p className="text-gray-400">No upcoming practice sessions scheduled.</p>
                </div>
              )}
            </div>

            {/* Upcoming Matches */}
            <div className="bg-gray-800 p-6 rounded-lg border border-blue-900">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Upcoming Matches</h2>
              </div>
              
              {upcomingMatches.length > 0 ? (
                <div className="space-y-4">
                  {upcomingMatches.map(match => (
                    <div key={match.id} className="bg-gray-700 p-4 rounded">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-white font-medium">
                            vs. {match.opponent}
                          </h3>
                          <p className="text-gray-400 text-sm">{match.tournament || 'Friendly Match'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">{new Date(match.date).toLocaleDateString()}</p>
                          <p className="text-gray-400 text-sm">{match.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-700 p-4 rounded text-center">
                  <p className="text-gray-400">No upcoming matches scheduled.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-gray-800 p-6 rounded-lg border border-blue-900">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaUser className="text-4xl text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">{userProfile?.fullName}</h3>
                <p className="text-blue-400">{userProfile?.role} Player</p>
                <p className="text-gray-400 text-sm mt-1">{currentUser?.email}</p>
              </div>
              
              <div className="border-t border-gray-700 pt-4 mt-4">
                <Link 
                  to="/profile" 
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-center font-semibold transition cursor-pointer"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
            
            {/* Team Chat */}
            <div className="bg-gray-800 p-6 rounded-lg border border-blue-900">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Team Communication</h3>
              <div className="space-y-3">
                <Link 
                  to="/chat" 
                  className="flex items-center bg-gray-700 p-3 rounded hover:bg-gray-600 transition cursor-pointer"
                >
                  <FaComments className="text-blue-400 text-xl mr-3" />
                  <span className="text-white">Team Chat</span>
                </Link>
                
                <Link 
                  to="/schedule" 
                  className="flex items-center bg-gray-700 p-3 rounded hover:bg-gray-600 transition cursor-pointer"
                >
                  <FaCalendarAlt className="text-blue-400 text-xl mr-3" />
                  <span className="text-white">Training Schedule</span>
                </Link>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="bg-gray-800 p-6 rounded-lg border border-blue-900">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/news" className="text-gray-300 hover:text-blue-400 transition">
                    Latest Team News
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-gray-300 hover:text-blue-400 transition">
                    Update Profile
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition">
                    Team Discord Server
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition">
                    Game Strategies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}