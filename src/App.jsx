import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './contexts/NewsContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <NewsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/story/:id" element={<StoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </NewsProvider>
  );
}

export default App; 