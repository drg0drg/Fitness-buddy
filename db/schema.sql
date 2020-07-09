
--creating the data base
CREATE DATABASE fitness_db;

USE fitness_db;

-- creating users table in <fitness_db>
CREATE TABLE users
(
  id INTEGER
  AUTO_INCREMENT,
  username VARCHAR NOT NULL, 
  password VARCHAR NOT NULL,
  PRIMARY KEY
  (id)
);



  --creating the users_exercises table in <fitness_db>
  CREATE TABLE users_exercises
  (
    user_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    PRIMARY KEY (user_id, exercise_id)
  )