import { Link } from 'react-router-dom';
import './StoryItem.css';

// Format timestamp to readable date
const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};

const StoryItem = ({ story }) => {
  // If story is null or undefined, return null
  if (!story) return null;
  
  // Extract story properties
  const { id, title, url, score, by, time, descendants } = story;

  // Format the URL host for display
  const getHostname = (url) => {
    try {
      if (!url) return '';
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '');
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="story-item">
      <div className="story-title">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="story-link"
        >
          {title}
        </a>
        {url && <span className="story-domain">({getHostname(url)})</span>}
      </div>
      
      <div className="story-meta">
        <span>{score} points</span>
        <span>by {by}</span>
        <span>{formatTime(time)}</span>
        <Link to={`/story/${id}`} className="story-comments">
          {descendants || 0} comments
        </Link>
      </div>
    </div>
  );
};

export default StoryItem; 