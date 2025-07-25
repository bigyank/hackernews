import { useState, useEffect } from 'react';
import { fetchItem } from '../../services/api';
import './Comment.css';

// Format timestamp to readable date
const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};

// Function to render HTML content safely
const createMarkup = (html) => {
  return { __html: html };
};

const Comment = ({ commentId }) => {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [childComments, setChildComments] = useState([]);
  
  useEffect(() => {
    const getComment = async () => {
      try {
        setLoading(true);
        const commentData = await fetchItem(commentId);
        setComment(commentData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comment:', error);
        setLoading(false);
      }
    };
    
    getComment();
  }, [commentId]);

  useEffect(() => {
    // Load child comments if comment is expanded and has kids
    if (isExpanded && comment?.kids?.length > 0) {
      setChildComments(comment.kids);
    }
  }, [isExpanded, comment]);

  // If comment is deleted or doesn't exist
  if (!loading && (!comment || comment.deleted)) {
    return <div className="comment deleted-comment">[deleted]</div>;
  }

  // If still loading
  if (loading) {
    return <div className="comment loading-comment">Loading...</div>;
  }

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">{comment.by}</span>
        <span className="comment-time">{formatTime(comment.time)}</span>
        <button 
          className="toggle-button" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '[-]' : '[+]'}
        </button>
      </div>
      
      {isExpanded && (
        <>
          <div 
            className="comment-text"
            dangerouslySetInnerHTML={createMarkup(comment.text)} 
          />
          
          {childComments.length > 0 && (
            <div className="child-comments">
              {childComments.map((childId) => (
                <Comment key={childId} commentId={childId} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment; 