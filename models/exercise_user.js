module.exports = (sequelize, DataTypes) => {
  const FaveExercise = sequelize.define('FaveExercise', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  FaveExercise.associate = function(models) {
    FaveExercise.belongsTo(models.User, {
      foreignKey: { allowNull: false }
    });
  };
  return FaveExercise;
};
