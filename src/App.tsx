import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MeetingPrepPage from './pages/meeting-prep';
import HomePage from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meetings/upcoming" element={<MeetingPrepPage />} />
      </Routes>
    </Router>
  );
}

export default App;
