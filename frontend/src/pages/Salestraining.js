import React, { useState } from 'react';
import './Salestraining.css';

const trainingModules = [
  { id: 1, title: 'Cold Calling 101', description: 'Learn the basics of making effective cold calls.', duration: '1 hour', status: 'Not Started' },
  { id: 2, title: 'Advanced Sales Techniques', description: 'Master advanced techniques for closing deals.', duration: '2 hours', status: 'In Progress' },
  { id: 3, title: 'Handling Objections', description: 'Understand how to handle objections and win over clients.', duration: '45 minutes', status: 'Completed' },
  { id: 4, title: 'Effective Email Campaigns', description: 'Learn how to create and manage effective email campaigns.', duration: '1.5 hours', status: 'Not Started' },
];

function Salestraining() {
  const [modules] = useState(trainingModules);

  return (
    <div className="sales-training-container">
      <h2>Sales Training</h2>
      <div className="training-grid">
        {modules.map((module) => (
          <div key={module.id} className="training-card">
            <div className="training-details">
              <p className="training-title">{module.title}</p>
              <p className="training-description">{module.description}</p>
              <p className="training-duration">Duration: {module.duration}</p>
              <p className={`training-status ${module.status.toLowerCase().replace(' ', '-')}`}>
                Status: {module.status}
              </p>
            </div>
            <div className="training-actions">
              {module.status === 'Not Started' && (
                <button className="action-btn start-btn">Start</button>
              )}
              {module.status === 'In Progress' && (
                <button className="action-btn continue-btn">Continue</button>
              )}
              {module.status === 'Completed' && (
                <button className="action-btn view-btn">View Details</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Salestraining;