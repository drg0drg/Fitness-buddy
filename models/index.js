'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const db = {};

// Setting environment variables
const dotenv = require('dotenv');
dotenv.config();

// Destructuring env variables
const {
  DB: dbTitle,
  DB_USER: dbUser,
  DB_PASS: dbPass,
  DB_HOST: dbHost
} = process.env;

// Setting options for db connections for use in session storage
const options = {
  host: dbHost,
  port: 3306,
  user: dbUser,
  password: dbPass,
  database: dbTitle,
  // Whether or not to automatically check for and clear expired sessions:
  clearExpired: true,
  // How frequently expired sessions will be cleared; milliseconds:
  checkExpirationInterval: 900000,
  // The maximum age of a valid session; milliseconds:
  expiration: 86400000
};

// Starting sequelize connection with env variables
const sequelize = new Sequelize(dbTitle, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql'
});

// Starting session storage
// This creates a table in the db with session data for passport to access
// and manages the entries within it/connection to it
const mysqlStore = new MySQLStore(options);

// Compiling models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.mysqlStore = mysqlStore;

module.exports = db;
