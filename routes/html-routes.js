// Requiring path to so we can use relative routes to our HTML files
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = app => {
  app.get('/', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.status(200).redirect('/members');
    }
    res.render('members', req);
  });

  app.get('/login', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect('/members');
    }
    res.render('login', req);
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/members', isAuthenticated, (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/members.html'));
  });

  // Search page
  app.get('/search', (req, res) => {
    res.render('search', req);
  });

  // Results page
  app.get('/results', (req, res) => {
    // Set some dummy test results data in the request and feed that into the renderer
    req.results = [
      { name: 'Dumbbell curls' },
      { name: 'Hammer curls' },
      { name: 'Preacher curls' }
    ];
    res.render('results', req);
  });

  // Exercises-details page
  app.get('/exercises-details', (req, res) => {
    res.render('exercises-details', req);
  });

  // Favourite-exercises page
  app.get('/favourite-exe', (req, res) => {
    res.render('favourite-exe', req);
  });
};
