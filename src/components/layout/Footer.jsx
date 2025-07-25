import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          This is a Hacker News clone built with React. 
          Data provided by the{' '}
          <a 
            href="https://github.com/HackerNews/API"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hacker News API
          </a>.
        </p>
        <p className="copyright">
          © {new Date().getFullYear()} Hacker News Clone
        </p>
      </div>
    </footer>
  );
};

export default Footer; 