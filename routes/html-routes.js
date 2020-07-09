// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Requiring in our wger module
// const wger = require('./wger-api-routes');

// Declaring the data object to be used by pug
const data = {};

module.exports = (app) => {
  // Root page
  app.get('/', (req, res) => {
    // If the user is logged in send them to the favourite exercises page
    if (req.user) {
      return res.status(200).redirect('/exercises');
    }
    return res.status(200).redirect('/login');
  });

  // Login page
  app.get('/login', (req, res) => {
    // If the user is logged in send them to the favourite exercises page
    if (req.user) {
      // Pass in the user's forename as a property to trigger the display of the welcome message
      // on the exercises page
      req.flash('forename', req.user.forename);

      return res.redirect('/exercises');
    }
    res.render('login');
  });

  // Signup page
  app.get('/signup', (req, res) => {
    // If the user is logged in send them to the favourite exercises page
    if (req.user) {
      return res.redirect('/exercises');
    }
    res.render('signup');
  });

  // Search page
  // isAuthenticated middleware: users who are not logged will be redirected to the signup page
  app.get('/search', isAuthenticated, (req, res) => {
    res.render('search', data);
  });

  // Results page
  app.get('/search/results', isAuthenticated, (req, res) => {
    // Set some dummy results data and feed that into the renderer
    data.results = [
      {
        id: 1,
        name: 'Dumbbell curls',
        favourite: true
      },
      {
        id: 2,
        name: 'Hammer curls',
        favourite: false
      },
      {
        id: 3,
        name: 'Preacher curls',
        favourite: true
      }
    ];

    // Pass the exercise results data into the render function
    res.render('results', data);
  });

  // Exercise details page
  app.get('/exercises/:id', isAuthenticated, (req, res) => {
    // Use the ID of the exercise that the user selected to query the database

    // Set some dummy exercise data and feed that into the renderer
    data.name = 'Dumbbell curls';
    data.description =
      'Lorem ipsum dolor sit amet, adolescens concludaturque mei ut, at eos populo accusam. Pri in illud accusata interpretaris, mel illud consul interpretaris ne.';
    data.image =
      'https://www.kindpng.com/picc/m/753-7538793_standing-dumbbell-curl-dumbell-curl-hd-png-download.png';
    data.video = 'https://www.youtube.com/embed/xxgxVU1NsNc';
    data.favourite = true;
    // Pass the exercise details data into the render function
    res.render('exerciseDetails', data);
  });

  // Favourite-exercises page
  app.get('/exercises', isAuthenticated, (req, res) => {
    // If the request passed in the forename (purposely not user.forename), then it must have
    // come from the login or signup page and therefore we want to display the 'welcome message'
    // So pass the user's forename into the data for the renderer
    console.log(`req.flash('forename') is returning ${req.flash('forename')}`);

    if (req.flash('forename')) {
      data.forename = req.flash('forename');
    } else {
      data.forename = null;
    }

    // Query the database to return the user's favourite exercise data

    // Set some dummy favourites data and feed that into the renderer
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

    res.render('faveExercises', data);
  });

  // Privacy policy
  app.get('/privacy-policy', (req, res) => {
    res.render('privacyPolicy');
  });
};
