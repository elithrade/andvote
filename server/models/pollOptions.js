export default function createPollOptionModel (sequelize, DataTypes) {
  const pollOption = sequelize.define('pollOption', {
    question: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    classMethods: {
      associate (models) {
        pollOption.belongsTo(models.poll)
      }
    }
  })

  return pollOption
}
