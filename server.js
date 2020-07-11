// Requiring necessary npm packages
const express = require('express');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');

// Requiring passport as we've configured it
const passport = require('./config/passport');

// Setting up port and requiring models for syncing
const db = require('./models');
const PORT = process.env.PORT || 8080;

// Creating express app
const app = express();

// Set Pug as the default templating engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(flash());

// We need to use sessions to keep track of our user's login status
// Requiring dotenv for local session secrets
const dotenv = require('dotenv');
dotenv.config();
const sessionSecret = process.env.SESSION_SECRET;

app.use(
  session({
    secret: sessionSecret,
    store: db.mysqlStore,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);

// Syncing our database and logging a message to the user upon success
const startConnection = async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(
        `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
      );
    });
  } catch (err) {
    console.error(`ERROR - server.js - startConnection(): ${err}`);
  }
};

startConnection();
