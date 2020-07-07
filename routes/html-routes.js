// Requiring path to so we can use relative routes to our HTML files
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Requiring in our wger module
const wger = require('./wger-api-routes');

module.exports = (app) => {
  app.get('/', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.status(200).redirect('/members');
    }
    return res.sendFile(path.join(__dirname, '../public/signup.html'));
  });

  app.get('/login', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect('/members');
    }
    return res.sendFile(path.join(__dirname, '../public/login.html'));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/members', isAuthenticated, (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/members.html'));
  });

  app.get('/exercises/all', isAuthenticated, async (req, res) => {
    res.json(await wger.getAllExercises());
  });

  app.get('/exercises/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    res.json(await wger.getExerciseById(id));
  });
};
