const axios = require('axios');

module.exports = {
  getExercises: async () => {
    try {
      const { data } = await axios.get(
        'https://wger.de/api/v2/exercise/?format=json&status=2&language=2'
      );
      return data;
    } catch (err) {
      console.error(`ERROR - wger-api-routes.js - getExercises(): ${err}`);
    }
  }
};
