import React, { useState, useEffect } from 'react';
import './Mailwizz.css';

function MailWizz() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch campaigns from the MailWizz API
  const fetchCampaigns = async () => {
    try {
      const response = await fetch('https://your-mailwizz-installation/api/campaigns', {
        headers: {
          'Authorization': 'Bearer your_api_key_here',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }

      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch campaigns when the component loads
  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="mailwizz-container">
      <h2>MailWizz Campaigns</h2>
      {error && <p className="error-message">{error}</p>}
      {campaigns.length > 0 ? (
        <div className="campaigns-grid">
          {campaigns.map((campaign) => (
            <div key={campaign.campaign_id} className="campaign-card">
              <div className="campaign-details">
                <p className="campaign-name">{campaign.name}</p>
                <p><strong>Sent:</strong> {campaign.sent} emails</p>
                <p><strong>Opened:</strong> {campaign.opened} emails</p>
                <p><strong>Clicked:</strong> {campaign.clicked} times</p>
                <p><strong>Status:</strong> {campaign.status}</p>
                <p><strong>Date:</strong> {campaign.date_added}</p>
              </div>
              <div className="campaign-actions">
                <button className="action-btn">View</button>
                <button className="action-btn">Edit</button>
                <button className="action-btn delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No campaigns found</p>
      )}
    </div>
  );
}

export default MailWizz;