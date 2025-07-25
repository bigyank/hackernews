import { useNews } from '../contexts/NewsContext';
import StoryItem from '../components/news/StoryItem';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import './HomePage.css';

const HomePage = () => {
  const { stories, loading, error, refreshStories } = useNews();

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Top Stories</h1>
        <button 
          className="refresh-button"
          onClick={refreshStories}
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {error && <Error message={error} />}

      {loading ? (
        <Loading />
      ) : (
        <div className="stories-list">
          {stories.length > 0 ? (
            stories.map((story) => (
              <StoryItem key={story.id} story={story} />
            ))
          ) : (
            <p className="no-stories">No stories available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage; 