const express = require('express');
const authProvider = require('../auth/AuthProvider');
const { REDIRECT_URI, POST_LOGOUT_REDIRECT_URI } = require('../authConfig');

const router = express.Router();

// Route for sign-in
router.get('/signin', authProvider.login({
    scopes: ['User.Read', 'Calendars.Read', 'Calendars.Read.Shared', 'Calendars.ReadBasic', 'Calendars.ReadWrite', 'Calendars.ReadWrite.Shared'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/home' // Redirect to your home page after successful login
}));

// Route for acquiring tokens silently
router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['User.Read', 'Calendars.Read', 'Calendars.Read.Shared', 'Calendars.ReadBasic', 'Calendars.ReadWrite', 'Calendars.ReadWrite.Shared'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/profile' // Redirect to the user profile after acquiring the token
}));

// Handle redirect after authentication
router.post('/redirect', authProvider.handleRedirect());

// Route for sign-out2
router.get('/signout', authProvider.logout({
    postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI // Redirect to a specific page after logout
}));

module.exports = router;