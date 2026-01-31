import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import AIInsights from './pages/AIInsights';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ConnectAccount from './pages/ConnectAccount';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/connect-account" element={<ConnectAccount />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/activity" element={<Layout><Activity /></Layout>} />
        <Route path="/ai-insights" element={<Layout><AIInsights /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
