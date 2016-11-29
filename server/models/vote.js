export default function createVoteModel (sequelize, DataTypes) {
  const vote = sequelize.define('vote', {
  }, {
    timestamps: false,
    classMethods: {
      associate (models) {
        vote.belongsTo(models.pollOption)
      }
    }
  })

  return vote
}
