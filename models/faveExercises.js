module.exports = (sequelize, DataTypes) => {
  const FaveExercise = sequelize.define('FaveExercise', {
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  FaveExercise.associate = (models) => {
    FaveExercise.belongsTo(models.User, {
      foreignKey: { allowNull: false }
    });
  };
  return FaveExercise;
};
