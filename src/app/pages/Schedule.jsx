import React, { useState, useEffect } from 'react';
import { useAuth } from '../../modules/auth/AuthProvider';
import { db } from '../../firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy 
} from 'firebase/firestore';
import { format } from 'date-fns';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaSnowflake } from 'react-icons/fa';
import * as Sentry from '@sentry/browser';

export default function Schedule() {
  const { currentUser } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming'); // 'upcoming', 'past', 'all'

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        console.log("Fetching schedules with filter:", filter);
        const today = new Date().toISOString().split('T')[0];
        
        let scheduleQuery;
        if (filter === 'upcoming') {
          scheduleQuery = query(
            collection(db, "schedules"),
            where("date", ">=", today),
            orderBy("date")
          );
        } else if (filter === 'past') {
          scheduleQuery = query(
            collection(db, "schedules"),
            where("date", "<", today),
            orderBy("date", "desc")
          );
        } else {
          scheduleQuery = query(
            collection(db, "schedules"),
            orderBy("date")
          );
        }
        
        const scheduleSnapshot = await getDocs(scheduleQuery);
        const scheduleData = scheduleSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setSchedules(scheduleData);
      } catch (error) {
        console.error("Error fetching schedules:", error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [filter]);

  const groupSchedulesByMonth = () => {
    const groups = {};
    
    schedules.forEach(schedule => {
      const date = new Date(schedule.date);
      const monthYear = format(date, 'MMMM yyyy');
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      
      groups[monthYear].push(schedule);
    });
    
    return groups;
  };

  const groupedSchedules = groupSchedulesByMonth();

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <FaSnowflake className="text-3xl text-blue-400 mr-3" />
              <h1 className="text-3xl font-bold text-blue-400">Team Schedule</h1>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded cursor-pointer ${
                  filter === 'upcoming' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 transition'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded cursor-pointer ${
                  filter === 'past' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 transition'
                }`}
              >
                Past
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded cursor-pointer ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 transition'
                }`}
              >
                All
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : schedules.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center border border-blue-900">
              <FaCalendarAlt className="text-5xl text-blue-400 mx-auto mb-4" />
              <h2 className="text-xl text-white mb-2">No Schedules Found</h2>
              <p className="text-gray-400">
                {filter === 'upcoming' 
                  ? 'There are no upcoming scheduled events.' 
                  : filter === 'past' 
                    ? 'There are no past scheduled events.' 
                    : 'There are no scheduled events.'}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedSchedules).map(([monthYear, monthSchedules]) => (
                <div key={monthYear}>
                  <h2 className="text-xl font-semibold text-blue-400 mb-4">{monthYear}</h2>
                  
                  <div className="space-y-4">
                    {monthSchedules.map(schedule => {
                      const scheduleDate = new Date(schedule.date);
                      const isPast = scheduleDate < new Date();
                      
                      return (
                        <div 
                          key={schedule.id} 
                          className={`bg-gray-800 rounded-lg overflow-hidden border ${
                            isPast ? 'border-gray-700' : 'border-blue-900'
                          }`}
                        >
                          <div className="md:flex">
                            <div className="md:w-1/4 bg-gray-700 p-6 flex flex-col items-center justify-center">
                              <div className={`text-4xl font-bold ${isPast ? 'text-gray-400' : 'text-blue-400'}`}>
                                {format(scheduleDate, 'd')}
                              </div>
                              <div className={`text-lg ${isPast ? 'text-gray-400' : 'text-white'}`}>
                                {format(scheduleDate, 'EEEE')}
                              </div>
                            </div>
                            
                            <div className="md:w-3/4 p-6">
                              <h3 className={`text-xl font-semibold mb-2 ${isPast ? 'text-gray-400' : 'text-white'}`}>
                                {schedule.title}
                              </h3>
                              
                              <p className="text-gray-400 mb-4">{schedule.description}</p>
                              
                              <div className="flex flex-wrap gap-4">
                                <div className="flex items-center text-gray-400">
                                  <FaClock className="mr-2" />
                                  <span>{schedule.time}</span>
                                </div>
                                
                                {schedule.location && (
                                  <div className="flex items-center text-gray-400">
                                    <FaMapMarkerAlt className="mr-2" />
                                    <span>{schedule.location}</span>
                                  </div>
                                )}
                              </div>
                              
                              {!isPast && schedule.calendarLink && (
                                <div className="mt-4">
                                  <a 
                                    href={schedule.calendarLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 text-sm transition"
                                  >
                                    Add to Calendar
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}