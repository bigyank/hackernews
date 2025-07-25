import { createContext, useState, useContext, useEffect } from 'react';
import { fetchTopStories, fetchItem } from '../services/api';

// Create context
const NewsContext = createContext();

// Custom hook to use the news context
export const useNews = () => useContext(NewsContext);

// Provider component that wraps app and makes news data available
export const NewsProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch top stories when component mounts
  useEffect(() => {
    const getTopStories = async () => {
      try {
        setLoading(true);
        const storyIds = await fetchTopStories();
        // Fetch first 20 stories for better performance
        const storyPromises = storyIds
          .slice(0, 20)
          .map(id => fetchItem(id));
        
        const storyData = await Promise.all(storyPromises);
        setStories(storyData.filter(story => story !== null));
        setError(null);
      } catch (err) {
        setError('Failed to fetch stories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTopStories();
  }, []);

  // Function to refresh stories
  const refreshStories = async () => {
    setLoading(true);
    try {
      const storyIds = await fetchTopStories();
      const storyPromises = storyIds
        .slice(0, 20)
        .map(id => fetchItem(id));
      
      const storyData = await Promise.all(storyPromises);
      setStories(storyData.filter(story => story !== null));
      setError(null);
    } catch (err) {
      setError('Failed to refresh stories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Values to provide to consuming components
  const value = {
    stories,
    loading,
    error,
    refreshStories
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}; 