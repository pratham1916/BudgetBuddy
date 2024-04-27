import React, { useState } from 'react';
import Tracker from '../components/Tracker';
import Analytics from '../components/Analytics';
import History from '../components/History';
import '../Styles/dashboard.css';

const Dashboard = () => {
  const [view, setView] = useState('Tracker');

  return (
    <div className="dashboardContainer">
      <div className="buttonContainer">
        <button className="button" onClick={() => setView('Tracker')}>Tracker</button>
        <button className="button" onClick={() => setView('Analytics')}>Analytics</button>
        <button className="button" onClick={() => setView('History')}>History</button>
      </div>
      <div className="content">
        {view === 'Tracker' && <Tracker />}
        {view === 'Analytics' && <Analytics />}
        {view === 'History' && <History />}
      </div>
    </div>
  );
};

export default Dashboard;
