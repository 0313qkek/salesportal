import React, { useState } from 'react';
import './Salesscript.css';

const salesScriptsData = [
  { id: 1, title: 'Cold Call Script', description: 'A basic cold call script for introducing the company and offerings.', date: 'Sep 20, 2024' },
  { id: 2, title: 'Follow-Up Script', description: 'A follow-up script after an initial call or email contact.', date: 'Sep 18, 2024' },
  { id: 3, title: 'Demo Request Script', description: 'Script for handling requests for product demos.', date: 'Sep 12, 2024' },
  { id: 4, title: 'Closing Script', description: 'A script designed to close deals and encourage a decision.', date: 'Sep 10, 2024' },
];

function Salesscript() {
  const [scripts] = useState(salesScriptsData);

  return (
    <div className="sales-script-container">
      <h2>Sales Scripts</h2>
      <div className="scripts-list">
        {scripts.map((script) => (
          <div key={script.id} className="script-card">
            <div className="script-details">
              <p className="script-title">{script.title}</p>
              <p className="script-description">{script.description}</p>
              <p className="script-date">Last updated: {script.date}</p>
            </div>
            <div className="script-actions">
              <button className="action-btn">View</button>
              <button className="action-btn">Edit</button>
              <button className="action-btn delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Salesscript;