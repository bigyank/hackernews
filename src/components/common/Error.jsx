import './Error.css';

const Error = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <p className="error-message">
        {message || 'Something went wrong. Please try again.'}
      </p>
    </div>
  );
};

export default Error; 