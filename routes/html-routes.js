// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

const data = {};

module.exports = app => {
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
    // Pass the exercise details data into the render function
    res.render('exerciseDetails', data);
  });

  // Favourite-exercises page
  app.get('/exercises', isAuthenticated, (req, res) => {
    // Pass the user's forename into the data for the renderer
    data.forename = req.user.forename;

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
};
