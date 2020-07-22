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
  getExerciseById: async (id) => {
    try {
      const { data } = await axios.get(
        `https://wger.de/api/v2/exerciseinfo/${id}/?format=json`
      );
      return data;
    } catch (err) {
      console.error(`ERROR - wger-api-routes.js - getExerciseById(): ${err}`);
    }
  },
  getPicById: async (id) => {
    try {
      const { data } = await axios.get(
        `https://wger.de/api/v2/exerciseimage/?format=json&status=2&exercise=${id}`
      );
      return data;
    } catch (err) {
      console.error(`ERROR - wger-api-routes.js - getPicById(): ${err}`);
    }
  },
  getExerciseByName: async function (name) {
    // Creating regex using input this escapes to stop exploits
    // Needed to make search case insensitive
    const queryStr = new RegExp(
      name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'),
      'i'
    );
    const returnArr = [];
    try {
      const results = await this.getAllExercises();

      // Looping through the results array and pushing matches to returnArr
      results.forEach(({ id, name }) => {
        if (name.search(queryStr) !== -1) returnArr.push({ id, name });
      });

      if (returnArr.length === 0) throw new Error('404: No Results found');
      return returnArr;
    } catch (err) {
      console.error(`ERROR - wger-api-routes.js - getExerciseByName(): ${err}`);
    }
  }
};
