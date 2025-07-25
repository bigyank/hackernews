import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchItem } from '../services/api';
import Comment from '../components/news/Comment';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import './StoryPage.css';

// Format timestamp to readable date
const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};

const StoryPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const getStory = async () => {
      try {
        setLoading(true);
        const storyData = await fetchItem(id);
        
        if (!storyData) {
          setError('Story not found');
        } else {
          setStory(storyData);
          setError(null);
        }
      } catch (err) {
        setError('Failed to load story');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getStory();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !story) {
    return <Error message={error} />;
  }

  return (
    <div className="story-page">
      <Link to="/" className="back-link">
        &larr; Back to top stories
      </Link>
      
      <div className="story-details">
        <h1 className="story-title">
          {story.url ? (
            <a 
              href={story.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {story.title}
            </a>
          ) : (
            story.title
          )}
        </h1>
        
        {story.url && (
          <span className="story-domain">({getHostname(story.url)})</span>
        )}
        
        <div className="story-meta">
          <span>{story.score} points</span>
          <span>by {story.by}</span>
          <span>on {formatTime(story.time)}</span>
        </div>

        {story.text && (
          <div 
            className="story-text"
            dangerouslySetInnerHTML={{ __html: story.text }} 
          />
        )}
      </div>
      
      <div className="comments-section">
        <h2 className="comments-header">
          {story.descendants || 0} Comments
        </h2>
        
        {story.kids && story.kids.length > 0 ? (
          <div className="comments-list">
            {story.kids.map((commentId) => (
              <Comment key={commentId} commentId={commentId} />
            ))}
          </div>
        ) : (
          <p className="no-comments">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default StoryPage; 