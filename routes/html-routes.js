// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Requiring in our wger module
const wger = require('./wger-api-routes');

// Declaring the data object to be used by pug
let data = {};

module.exports = (app) => {
  // Root page
  app.get('/', (req, res) => {
    const { isInitialLogin } = req.query;
    // If the user is logged in send them to the favourite exercises page
    if (req.user) {
      if (isInitialLogin) {
        return res.status(200).redirect('/exercises/?isInitialLogin=true');
      }
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
  app.get('/search/results', isAuthenticated, async (req, res) => {
    // Set some dummy results data and feed that into the renderer
    const { exerciseName } = req.query;
    data.results = await wger.getExerciseByName(exerciseName);

    // Pass the exercise results data into the render function
    res.render('results', data);
  });

  // Exercise details page
  app.get('/exercises/:id', isAuthenticated, async (req, res) => {
    // Use the ID of the exercise that the user selected to query the database
    const { id } = req.params;
    const { name, description } = await wger.getExerciseById(id);
    const { results } = await wger.getPicById(id);
    const { image } = results[0];

    data = {
      name,
      description,
      image,
      favourite: true /* to be edited to check faveExercises table */
    };
    // Functionality already written in pug to take in an iFrame (YouTube vid)
    res.render('exerciseDetails', data);
  });

  // Favourite-exercises page
  app.get('/exercises', isAuthenticated, (req, res) => {
    // If the request passed in the forename (purposely not user.forename), then it must have
    // come from the login or signup page and therefore we want to display the 'welcome message'
    // So pass the user's forename into the data for the renderer
    const { isInitialLogin } = req.query;

    // Set the showWelcome value to the value of initial login (true or undefined)
    data.showWelcome = isInitialLogin;

    // Set the user's forename in the data being passed into the template engine
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

  // Privacy policy
  app.get('/privacy-policy', (req, res) => {
    res.render('privacyPolicy');
  });
};
