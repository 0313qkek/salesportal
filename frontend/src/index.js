import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './context/UserContext'; // adjust the path based on your directory structure

// Wrap the entire app in UserProvider to give access to user context across all components
ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);