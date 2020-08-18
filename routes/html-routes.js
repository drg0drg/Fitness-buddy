// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Requiring in our wger module
const wger = require('./wger-api-routes');

const db = require('../models');

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
    // Get results data and feed that into the renderer
    const { exerciseName } = req.query;
    const { id } = req.user;
    try {
      // Function will check the DB for favourites and passes the data for pug
      const resultsArr = await wger.getExerciseByName(exerciseName);
      const faveExerciseArr = await db.FaveExercise.findAll({
        where: {
          UserId: id
        }
      });
      const faveIdArr = [];
      faveExerciseArr.forEach(({ dataValues }) => {
        faveIdArr.push(dataValues.exercise_id);
      });

      resultsArr.forEach((obj) => {
        const { id } = obj;
        obj.favourite = faveIdArr.indexOf(id) !== -1;
      });
      data.results = resultsArr;
      // Pass the exercise results data into the render function
      res.render('results', data);
    } catch (err) {
      console.error(`ERROR - html-routes.js - .get('/search/results'): ${err}`);
    }
  });

  // Exercise details page
  app.get('/exercises/:exerciseId', isAuthenticated, async (req, res) => {
    let { exerciseId } = req.params;
    exerciseId = parseInt(exerciseId);
    // Use the ID of the exercise that the user selected to query the database
    const { id } = req.user;
    try {
      // Grabbing exercise details from wger
      const { name, description } = await wger.getExerciseById(exerciseId);
      const results = await wger.getPicById(exerciseId);
      // Setting a placeholder image for if no image is found
      const image = results.length > 0 ? results[0].image : '/img/dumbbell.png';

      const faveExerciseArr = await db.FaveExercise.findAll({
        where: {
          UserId: id
        }
      });

      // Checking the result against the favourites to set
      // '(Add to || Remove from) favourites' button state on page load
      let favourite;
      for (const i in faveExerciseArr) {
        const { dataValues } = faveExerciseArr[i];
        const { exercise_id: faveExerciseId } = dataValues;
        if (faveExerciseId === exerciseId) {
          favourite = true;
          break;
        }
      }

      data = {
        name,
        description,
        image,
        favourite,
        exerciseId
      };
      // Functionality already written in pug to take in an iFrame (YouTube vid)
      res.render('exerciseDetails', data);
    } catch (err) {
      console.error(`ERROR - html-routes.js - /exercises/:exerciseId: ${err}`);
    }
  });

  // Favourite-exercises page
  app.get('/exercises', isAuthenticated, async (req, res) => {
    // If the request passed in the forename (purposely not user.forename), then it must have
    // come from the login or signup page and therefore we want to display the 'welcome message'
    // So pass the user's forename into the data for the renderer
    const { isInitialLogin } = req.query;

    // Set the showWelcome value to the value of initial login (true or undefined)
    data.showWelcome = isInitialLogin;

    // Set the user's forename in the data being passed into the template engine
    data.forename = req.user.forename;

    // Query the database to return the user's favourite exercise data
    try {
      const faveExerciseArr = await db.FaveExercise.findAll({
        where: {
          UserId: req.user.id
        }
      });
      // Creating an array of favourite IDs from the user table
      const exercisesIdArr = [];
      faveExerciseArr.forEach(({ dataValues }) => {
        const { exercise_id: exerciseId } = dataValues;
        exercisesIdArr.push(exerciseId);
      });
      // Retrieve all exercises from db and push id and name into favourites
      data.favourites = [];
      const exercises = await wger.getAllExercises();
      exercises.forEach(({ id, name }) => {
        if (exercisesIdArr.indexOf(id) !== -1) {
          data.favourites.push({ id, name });
        }
      });
      res.render('faveExercises', data);
    } catch (err) {
      console.error(`ERROR - html-routes.js - /exercises: ${err}`);
    }
  });

  // Privacy policy
  app.get('/privacy-policy', (req, res) => {
    res.render('privacyPolicy');
  });
};
