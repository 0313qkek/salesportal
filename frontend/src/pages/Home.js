import React, { useState, useEffect } from 'react';
import './Home.css';
import ProfileModal from '../components/ProfileModal';
import { useUser } from '../context/UserContext';

function Home() {

  const { user } = useUser();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userGoal, setUserGoal] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [calendar, setCalendar] = useState([]);

  const handleViewProfile = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      setUserFirstName(user.firstName);
      setUserLastName(user.lastName);
      setUserRole(user.role);
      setUserGoal(user.goal);
      setUserPicture(user.picture || "https://via.placeholder.com/100");
    }
  }, [user]);

  return (
    <div className="home-container">

      <div className="profile-section">
        <div className="profile-info">
          <img className="profile-picture" src={userPicture} alt="Profile" />
          <div className="profile-details">
            <h2>{userFirstName} {userLastName}</h2>
            <p className="role">{userRole}</p>
            <p className="goals">Goals:</p>
            <p className="goal-description">
              {userGoal}
            </p>
          </div>
        </div>
        <button onClick={handleViewProfile} className="view-profile-btn">View Profile</button>
        <ProfileModal isOpen={isProfileModalOpen} closeModal={closeProfileModal} />
      </div>

      <div className="meetings-section">
        <div className='meetings-header'>
          <h2>Upcoming meetings</h2>
        </div>
        <div className='meetings-calender'>
          <div className="meetings-calendar">
            <iframe
              src="https://outlook.office365.com/owa/calendar/e8e0d6cad25f40028e59d3d135c8502d@bunchful.com/fffd0db37ad64b84895e623c8e6e9e0c4485014367789979639/calendar.html"
              title="Outlook Calendar"
              width="100%"
              height="600px"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="footer-message">
        Join us in making a positive impact with sustainable practices and philanthropic efforts.
      </div>
    </div>
  );
}

export default Home;