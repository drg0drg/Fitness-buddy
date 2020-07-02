'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = {};

// Setting environment variables
const dotenv = require('dotenv');
dotenv.config();

// Destructuring env variables
const {
  DB: dbTitle,
  DB_USER: dbUser,
  DB_PASS: dbPass,
  DB_HOST: dbHost,
  JAWSDB_URL: dbJawsUrl
} = process.env;

// Starting sequelize connection with env variables
const sequelize = new Sequelize(dbJawsUrl || dbTitle, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql'
});

// const sequelize = config.use_env_variable
//   ? new Sequelize(process.env[config.use_env_variable])
//   : new Sequelize(config.database, config.username, config.password, config);

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

module.exports = db;
