import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function MeetingPrepPage() {
  return <div className="p-8 text-2xl">Meeting Prep Placeholder</div>;
}

function HomePage() {
  return <div className="p-8 text-2xl">Home</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meeting-prep" element={<MeetingPrepPage />} />
      </Routes>
    </Router>
  );
}

export default App;
