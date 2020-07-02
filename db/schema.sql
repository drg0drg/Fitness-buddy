
--creating the data base
CREATE DATABASE fitness_db;

USE fitness_db;

-- creating users table in <fitness_db>
CREATE TABLE users
(
  id INTEGER AUTO_INCREMENT,
  username VARCHAR NOT NULL, 
  password VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

-- creating exercises table in <fitness_db>
CREATE TABLE exercises
(
  id INTEGER AUTO_INCREMENT,
  name VARCHAR NOT NULL, 
  muscle_group VARCHAR NOT NULL,
  description VARCHAR (500),
  image VARCHAR (50), 
  equipment VARCHAR (50),
  PRIMARY KEY (id)
);

--creating the users_exercises table in <fitness_db>
CREATE TABLE users_exercises
(
  user_id INTEGER NOT NULL,
  exercise_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (exercise_id) REFERENCES exercises (id),
  PRIMARY KEY (user_id, exercise_id)
)