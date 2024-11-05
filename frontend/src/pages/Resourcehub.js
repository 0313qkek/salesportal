import React from 'react';
import './Resourcehub.css';
import { Link } from 'react-router-dom';

function ResourceHub() {

  const resourcesData = [
    { id: 1, name: 'Bunchful MeCard', image: 'https://via.placeholder.com/200', link: 'https://bunchful.me' },
    { id: 2, name: 'Bunchful Atlas', image: 'https://via.placeholder.com/200', link: 'https://bunchfulatlas.com' },
    { id: 3, name: 'Bunchful Badge', image: 'https://via.placeholder.com/200', link: 'https://bunchful.com' },
    { id: 4, name: 'Bunchful Ball', image: 'https://via.placeholder.com/200', link: 'https://bunchful.com/bunchful-ball/' },
    { id: 5, name: 'World Concert', image: 'https://via.placeholder.com/200', link: 'https://bunchful.com/world-concert/' },
    { id: 6, name: 'World Summit/Awards', image: 'https://via.placeholder.com/200', link: 'https://bunchful.com/world-summit/' },
    { id: 7, name: 'Gift Salon', image: 'https://via.placeholder.com/200', link: 'https://bunchful.com/media/#salon' },
    { id: 8, name: 'Podcast', image: 'https://via.placeholder.com/200', link: 'https://bunchful.com/media/' },
    { id: 9, name: 'Bunchful News', image: 'https://via.placeholder.com/200', link: 'https://bunchful.news' },
  ];

  return (
    <div className="resource-hub-container">
      <h2>Bunchful Products / Services</h2>
      <div className="resource-grid">
        {resourcesData.map((resource) => (
          <Link to={resource.link} key={resource.id} className="resource-card">
            <img src={resource.image} alt={resource.name} className="resource-image" />
            <div className="resource-info">
              <p>{resource.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ResourceHub;