<h1 align="center">Fitness Buddy</h1>

<div align="center">
  <img src="https://img.shields.io/github/license/JoeDodgson/Fitness-buddy" alt="License Badge" />
  <img src="https://img.shields.io/github/issues/JoeDodgson/Fitness-buddy" alt="Issues Badge"/>
</div>

<br/>
<br/>

## Table of Contents

[Description](#description)

[Installation](#installation)

[Usage](#usage)

[Tests](#tests)

[Authors](#authors)

<br>

## Description

Fitness Buddy is a fitness app that provides users with a guidance on how to perform exercises.

The user can create a profile by signing up and is able to find detailed information on exercises. Queries can be launched in the _Search Page_ by _Exercise Name_, _Muscle Group_ or _Equipment_. Any result in _Results Page_ can then be added to favourites. The user can thus have a list of personal selections that can be accessed any time on the _Favourite Exercises Page_. Any item in the personal list can be interrogated for more information on how the specific exercise can be performed, including picture and a full description.

Built on _Node.js_ environment, Fitness Buddy uses a _sql_ database, Wger API and is deployed on Heroku.

On the back end, the server is setup with `node` and `express`.

The [passport](https://www.npmjs.com/package/passport) npm module is used for authentication and the app features an _ORM_ using `sequelize`.

Fitness Buddy creates the front end via `pug.js` template engine and deploys on Heroku.

## Installation

Fitness Buddy App is Heroku deployed thus no installation is needed.

## Usage

Follow the link below to access the deployed application:

https://jdj-fitness-buddy.herokuapp.com

## Tests

Tests conducted to ensure good functionality of server connection and database, sequelize ORM, authentication, pug.js module, third party API and Heroku deployment.

## Authors

- Jacob Houston
- Joe Dodgson
- Dragos Dragomir
