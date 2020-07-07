const axios = require('axios');

module.exports = {
  getAllExercises: async () => {
    try {
      const { data } = await axios.get(
        'https://wger.de/api/v2/exercise/?format=json&status=2&language=2'
      );
      return data;
    } catch (err) {
      console.error(`ERROR - wger-api-routes.js - getAllExercises(): ${err}`);
    }
  },
  getExerciseById: async id => {
    try {
      const { data } = await axios.get(
        `https://wger.de/api/v2/exerciseinfo/${id}/?format=json`
      );
      return data;
    } catch (err) {
      console.error(`ERROR - wger-api-routes.js - getExerciseById(): ${err}`);
    }
  },
  getPicById: async id => {
    try {
      const { data } = await axios.get(
        `https://wger.de/api/v2/exerciseimage/?format=json&status=2&exercise=${id}`
      );
      return data;
    } catch (err) {
      console.error(`ERROR - wger-api-routes.js - getPicById(): ${err}`);
    }
  }
};
