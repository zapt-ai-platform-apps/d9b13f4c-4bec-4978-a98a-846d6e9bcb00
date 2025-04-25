import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../modules/auth/AuthProvider';
import { db } from '../../firebase';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  addDoc, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { FaPaperPlane, FaSpinner, FaSnowflake } from 'react-icons/fa';
import * as Sentry from '@sentry/browser';

export default function Chat() {
  const { currentUser, userProfile } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    try {
      console.log("Setting up chat listener");
      // Get messages from Firestore
      const messagesQuery = query(
        collection(db, "chat"),
        orderBy("timestamp", "asc"),
        limit(100)
      );
      
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        console.log(`Received ${snapshot.docs.length} chat messages`);
        const messageData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messageData);
        setLoading(false);
        // Scroll to bottom on new messages
        setTimeout(scrollToBottom, 100);
      });
      
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching messages:", error);
      Sentry.captureException(error);
      setLoading(false);
    }
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    setSending(true);
    try {
      console.log("Sending message:", newMessage);
      await addDoc(collection(db, "chat"), {
        text: newMessage,
        userId: currentUser.uid,
        userName: userProfile?.fullName || 'Team Member',
        userRole: userProfile?.role || '',
        timestamp: serverTimestamp()
      });
      
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
      Sentry.captureException(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-blue-900">
            {/* Chat Header */}
            <div className="bg-gray-900 p-4 border-b border-blue-900 flex items-center">
              <FaSnowflake className="text-blue-400 text-2xl mr-3" />
              <div>
                <h2 className="text-xl font-semibold text-blue-400">Team Chat</h2>
                <p className="text-gray-400 text-sm">
                  Communicate with your teammates in real-time
                </p>
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="p-4 h-[500px] overflow-y-auto bg-gray-900">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <FaSpinner className="animate-spin text-blue-400 text-3xl" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <p>No messages yet. Be the first to send a message!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isCurrentUser = message.userId === currentUser.uid;
                    const timestamp = message.timestamp?.toDate?.() || new Date();
                    
                    return (
                      <div 
                        key={message.id}
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            isCurrentUser 
                              ? 'bg-blue-700 text-white' 
                              : 'bg-gray-700 text-white'
                          }`}
                        >
                          {!isCurrentUser && (
                            <div className="flex items-center mb-1">
                              <span className="font-semibold text-sm">{message.userName}</span>
                              {message.userRole && (
                                <span className="text-xs text-blue-300 ml-2">
                                  {message.userRole}
                                </span>
                              )}
                            </div>
                          )}
                          
                          <p>{message.text}</p>
                          <p className="text-xs text-gray-300 mt-1 text-right">
                            {formatDistanceToNow(timestamp, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-blue-900">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-l text-white box-border"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={sending || !newMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaPaperPlane />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}