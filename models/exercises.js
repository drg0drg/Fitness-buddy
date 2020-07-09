// sequelize (lowercase) references the connection to the DB in (index.js file)
// const { sequelize } = require('index.js');

// Creating the Exercise model
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    muscle_gr: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    equipment: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });
  return Exercise;
};
