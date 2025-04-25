import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthProvider';
import { db } from '../../firebase';
import { 
  collection, 
  query, 
  getDocs, 
  orderBy, 
  limit,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { format } from 'date-fns';
import { FaCalendarAlt, FaComment, FaUser, FaSnowflake } from 'react-icons/fa';
import toast from 'react-hot-toast';
import * as Sentry from '@sentry/browser';

export default function News() {
  const { currentUser, userProfile } = useAuth();
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log("Fetching news articles");
        const articlesQuery = query(
          collection(db, "articles"),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        
        const articlesSnapshot = await getDocs(articlesQuery);
        const articlesData = articlesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setArticles(articlesData);
        
        // Set the first article as selected by default
        if (articlesData.length > 0) {
          setSelectedArticle(articlesData[0]);
          fetchComments(articlesData[0].id);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const fetchComments = async (articleId) => {
    try {
      console.log("Fetching comments for article:", articleId);
      const commentsQuery = query(
        collection(db, `articles/${articleId}/comments`),
        orderBy("timestamp", "asc")
      );
      
      const commentsSnapshot = await getDocs(commentsQuery);
      const commentsData = commentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setComments(prev => ({
        ...prev,
        [articleId]: commentsData
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
      Sentry.captureException(error);
    }
  };

  const handleAddComment = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to comment.');
      return;
    }
    
    if (!newComment.trim()) return;
    
    setSubmittingComment(true);
    try {
      console.log("Adding comment to article:", selectedArticle.id);
      await addDoc(
        collection(db, `articles/${selectedArticle.id}/comments`),
        {
          text: newComment,
          userId: currentUser.uid,
          userName: userProfile?.fullName || 'Team Member',
          userRole: userProfile?.role || '',
          timestamp: serverTimestamp()
        }
      );
      
      setNewComment('');
      toast.success('Comment added successfully!');
      
      // Refresh comments
      fetchComments(selectedArticle.id);
    } catch (error) {
      console.error("Error adding comment:", error);
      Sentry.captureException(error);
      toast.error('Failed to add comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    
    if (!comments[article.id]) {
      fetchComments(article.id);
    }
  };

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
          <h1 className="text-3xl font-bold text-blue-400">Team News & Updates</h1>
        </div>
        
        {articles.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center border border-blue-900">
            <h2 className="text-xl text-white mb-2">No Articles Found</h2>
            <p className="text-gray-400">Check back later for team news and updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article List - Sidebar */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Recent Articles</h2>
              
              <div className="bg-gray-800 rounded-lg border border-blue-900 overflow-hidden">
                {articles.map(article => (
                  <div 
                    key={article.id}
                    onClick={() => handleSelectArticle(article)}
                    className={`p-4 border-b border-gray-700 cursor-pointer transition ${
                      selectedArticle?.id === article.id 
                        ? 'bg-blue-900' 
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    <h3 className="font-medium text-white">{article.title}</h3>
                    <div className="flex items-center text-sm text-gray-400 mt-2">
                      <FaCalendarAlt className="mr-1" />
                      <span>
                        {article.createdAt?.toDate 
                          ? format(article.createdAt.toDate(), 'MMMM d, yyyy') 
                          : 'Recent'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Article Content */}
            <div className="lg:col-span-2">
              {selectedArticle && (
                <div className="bg-gray-800 rounded-lg border border-blue-900 overflow-hidden">
                  {/* Article Header */}
                  <div className="p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedArticle.title}
                    </h2>
                    
                    <div className="flex items-center text-gray-400 mb-4">
                      <FaUser className="mr-2" />
                      <span>Posted by {selectedArticle.authorName}</span>
                      <span className="mx-2">•</span>
                      <FaCalendarAlt className="mr-2" />
                      <span>
                        {selectedArticle.createdAt?.toDate 
                          ? format(selectedArticle.createdAt.toDate(), 'MMMM d, yyyy') 
                          : 'Recent'}
                      </span>
                    </div>
                    
                    {selectedArticle.imageUrl && (
                      <div className="mb-6">
                        <img 
                          src={selectedArticle.imageUrl}
                          alt={selectedArticle.title}
                          className="w-full h-auto rounded"
                        />
                      </div>
                    )}
                    
                    <div className="prose prose-lg text-gray-300 max-w-none">
                      {selectedArticle.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Comments Section */}
                  <div className="p-6 bg-gray-900">
                    <h3 className="text-xl font-semibold text-blue-400 mb-4">
                      Comments
                    </h3>
                    
                    {currentUser ? (
                      <div className="mb-6">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white box-border resize-none h-24"
                        ></textarea>
                        
                        <div className="mt-2 text-right">
                          <button
                            onClick={handleAddComment}
                            disabled={!newComment.trim() || submittingComment}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {submittingComment ? 'Posting...' : 'Post Comment'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-900 bg-opacity-30 p-4 rounded mb-6">
                        <p className="text-gray-300">
                          <Link to="/login" className="text-blue-400 hover:text-blue-300 transition">
                            Log in
                          </Link> or <Link to="/register" className="text-blue-400 hover:text-blue-300 transition">
                            register
                          </Link> to post a comment.
                        </p>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      {comments[selectedArticle.id]?.length > 0 ? (
                        comments[selectedArticle.id].map(comment => (
                          <div key={comment.id} className="bg-gray-800 p-4 rounded">
                            <div className="flex items-center mb-2">
                              <FaUser className="text-blue-400 mr-2" />
                              <span className="font-medium text-white">{comment.userName}</span>
                              {comment.userRole && (
                                <span className="text-xs text-blue-300 ml-2">
                                  {comment.userRole}
                                </span>
                              )}
                              <span className="text-gray-500 text-sm ml-auto">
                                {comment.timestamp?.toDate 
                                  ? format(comment.timestamp.toDate(), 'MMM d, yyyy h:mm a') 
                                  : 'Just now'}
                              </span>
                            </div>
                            
                            <p className="text-gray-300">{comment.text}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-400 py-4">
                          <FaComment className="text-4xl mx-auto mb-2 opacity-30" />
                          <p>No comments yet. Be the first to share your thoughts!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}