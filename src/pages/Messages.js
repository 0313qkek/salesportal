import React, { useState } from 'react';
import './Messages.css';

const users = [
  { id: 1, name: 'jdoe.mobbin', status: 'Active now', avatar: 'https://via.placeholder.com/50' },
  { id: 2, name: 'janedoe', status: 'Active now', avatar: 'https://via.placeholder.com/50' },
];

function Messages() {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  return (
    <div className="message-container">
      <div className="sidebar">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-card ${user.id === selectedUser.id ? 'active' : ''}`}
            onClick={() => setSelectedUser(user)}
          >
            <img src={user.avatar} alt="Avatar" className="user-avatar" />
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p className="user-status">{user.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <img src={selectedUser.avatar} alt="Avatar" className="user-avatar-large" />
          <div className="chat-user-info">
            <p className="chat-user-name">{selectedUser.name}</p>
            <p className="chat-user-status">{selectedUser.status}</p>
          </div>
        </div>

        <div className="chat-body">
          {/* This is where the messages would appear */}
        </div>

        <div className="chat-footer">
          <input type="text" placeholder="Message..." className="chat-input" />
          <div className="chat-actions">
            <button className="icon-btn">
              <span role="img" aria-label="emoji">
                😊
              </span>
            </button>
            <button className="icon-btn">
              <img src="https://via.placeholder.com/24" alt="Upload" />
            </button>
            <button className="icon-btn">
              <span role="img" aria-label="heart">
                ❤️
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;