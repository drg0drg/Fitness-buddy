// Requiring path so we can use relative routes to our HTML files
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = app => {
  app.get('/', (req, res) => {
    // If the user already has an account send them to the favourite exercises page
    if (req.user) {
      return res.status(200).redirect('/favourite-exe');
    }
    return res.status(200).redirect('/login');
  });

  app.get('/login', (req, res) => {
    // If the user already has an account send them to the favourite exercises page
    if (req.user) {
      return res.redirect('/favourite-exe');
    }
    res.render('login');
  });

  app.get('/signup', (req, res) => {
    // If the user already has an account send them to the favourite exercises page
    if (req.user) {
      return res.redirect('/favourite-exe');
    }
    res.render('signup');
  });

  // Here we've added our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get('/members', isAuthenticated, (req, res) => {
  //   return res.sendFile(path.join(__dirname, '../public/members.html'));
  // });

  // Search page
  // Here we've added our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/search', isAuthenticated, (req, res) => {
    res.render('search');
  });

  // Results page
  app.get('/results', (req, res) => {
    // Set some dummy results data and feed that into the renderer
    const data = {};
    data.results = [
      {
        id: 1,
        name: 'Dumbbell curls'
      },
      {
        id: 2,
        name: 'Hammer curls'
      },
      {
        id: 3,
        name: 'Preacher curls'
      }
    ];

    // Pass the exercise results data into the render function
    res.render('results', data);
  });

  // Exercises-details page
  app.get('/exercises-details/:id', isAuthenticated, (req, res) => {
    // Use the ID of the exercise that the user selected to query the database

    // Set some dummy exercise data and feed that into the renderer
    const data = {
      id: req.params.id,
      name: 'Dumbbell curls',
      description:
        'Lorem ipsum dolor sit amet, adolescens concludaturque mei ut, at eos populo accusam. Pri in illud accusata interpretaris, mel illud consul interpretaris ne.',
      image:
        'https://www.kindpng.com/picc/m/753-7538793_standing-dumbbell-curl-dumbell-curl-hd-png-download.png'
    };

    // Pass the exercise details data into the render function
    res.render('exercises-details', data);
  });

  // Favourite-exercises page
  app.get('/favourite-exe', isAuthenticated, (req, res) => {
    // Query the database to return the user's favourite exercise data

    // Set some dummy favourites data and feed that into the renderer
    const data = {};
    data.favourites = [
      {
        id: 1,
        name: 'Dumbbell curls'
      },
      {
        id: 2,
        name: 'Hammer curls'
      },
      {
        id: 3,
        name: 'Preacher curls'
      }
    ];

    res.render('favourite-exe', data);
  });
};
