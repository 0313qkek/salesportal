import React, { useState } from 'react';
import './Competitor.css';

const competitorData = [
  {
    id: 1,
    name: 'Competitor A',
    strengths: 'Strong online presence, good customer reviews.',
    weaknesses: 'Limited product variety, higher prices.',
    opportunities: 'Expand in emerging markets.',
  },
  {
    id: 2,
    name: 'Competitor B',
    strengths: 'Wide product range, affordable pricing.',
    weaknesses: 'Poor customer service, outdated website.',
    opportunities: 'Improve online shopping experience.',
  },
  {
    id: 3,
    name: 'Competitor C',
    strengths: 'Strong brand reputation, loyal customers.',
    weaknesses: 'Limited availability in certain regions.',
    opportunities: 'Expand geographically.',
  },
];

function Competitor() {
  const [competitors] = useState(competitorData);

  return (
    <div className="competitor-analysis-container">
      <h2>Competitor Analysis</h2>
      <div className="competitor-grid">
        {competitors.map((competitor) => (
          <div key={competitor.id} className="competitor-card">
            <div className="competitor-details">
              <p className="competitor-name">{competitor.name}</p>
              <p><strong>Strengths:</strong> {competitor.strengths}</p>
              <p><strong>Weaknesses:</strong> {competitor.weaknesses}</p>
              <p><strong>Opportunities:</strong> {competitor.opportunities}</p>
            </div>
            <div className="competitor-actions">
              <button className="action-btn">View Report</button>
              <button className="action-btn">Compare</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Competitor;