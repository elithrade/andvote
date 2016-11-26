import Connection from 'sequelize-connect'

const pollController = { }

pollController.handlePost = function (req, res, next) {
  var sequelize = new Connection().sequelize
  sequelize.transaction(async transaction => {
    const createdPoll = await sequelize.models.poll.create({
      question: req.body.question
    }, {
      transaction
    })
    const pollOptions = req.body.options.map(option => {
      return {
        text: option,
        pollId: createdPoll.dataValues.id
      }
    })
    await sequelize.models.pollOption.bulkCreate(pollOptions, {
      transaction
    })
    res.sendStatus(201)
  }).catch(next)
}

export default pollController
