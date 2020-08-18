// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport');

module.exports = (app) => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    const { email, id } = req.user;
    res.json({
      email,
      id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', async (req, res) => {
    const { forename, surname, email, password } = req.body;
    try {
      await db.User.create({
        forename,
        surname,
        email,
        password
      });

      res.redirect(307, '/api/login');
    } catch (err) {
      console.error(`ERROR - api-routes.js - .post('/api/signup'): ${err}`);
      res.status(401).json(err);
    }
  });

  // Route for logging user out
  app.get('/api/logout', async (req, res) => {
    try {
      await req.logout();
      res.redirect('/');
    } catch (err) {
      console.error(`ERROR - api-routes.js - .get('/api/logout'): ${err}`);
      res.status(401).json(err);
    }
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      const { forename, email, id } = req.user;
      res.json({
        forename: forename,
        email: email,
        id: id
      });
    }
  });

  app.post('/api/fave-exercise/:id', async (req, res) => {
    const { id: exerciseId } = req.params;
    const { id } = req.user;

    try {
      await db.FaveExercise.create({
        exercise_id: exerciseId,
        UserId: id
      });
      res.sendStatus(200);
    } catch (err) {
      console.error(
        `ERROR - api-routes.js - .post('/api/fave-exercise'): ${err}`
      );
      res.status(401).json(err);
    }
  });

  app.delete('/api/fave-exercise/:id', async (req, res) => {
    const { id: exerciseId } = req.params;
    const { id } = req.user;

    try {
      await db.FaveExercise.destroy({
        where: {
          exercise_id: exerciseId,
          UserId: id
        }
      });
      res.sendStatus(200);
    } catch (err) {
      console.error(
        `ERROR - api-routes.js - .post('/api/fave-exercise'): ${err}`
      );
      res.status(401).json(err);
    }
  });
};
