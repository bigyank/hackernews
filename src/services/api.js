import axios from 'axios';

const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

// Fetch top stories IDs
export const fetchTopStories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/topstories.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top stories:', error);
    return [];
  }
};

// Fetch item details by ID (story, comment, etc.)
export const fetchItem = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/item/${id}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item ${id}:`, error);
    return null;
  }
};

// Fetch user details
export const fetchUser = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${username}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    return null;
  }
}; 