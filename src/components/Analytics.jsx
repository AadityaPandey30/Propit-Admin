import { useState, useEffect } from 'react';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({ usersInteracted: 0, leadsGenerated: 0 });

  useEffect(() => {
    fetch('data/dummyAnalytics.json')
      .then(response => response.json())
      .then(data => setAnalyticsData(data.analytics))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Analytics</h2>
      <p><strong>Total Users Interacted:</strong> {analyticsData.usersInteracted}</p>
      <p><strong>Total Leads Generated:</strong> {analyticsData.leadsGenerated}</p>
    </div>
  );
};

export default Analytics;