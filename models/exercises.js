
// sequelize (lowercase) references the connection to the DB in (index.js file)
const {sequelize} = require("index.js");

//Creating the Exercise model
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define("Exercise", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    muscle_gr: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    description:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    equipment:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });
}

// Syncs with DB
Exercise.sync();
