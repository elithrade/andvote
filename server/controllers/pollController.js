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
    res.status(201).json({
      createdPollId: createdPoll.dataValues.id
    })
  }).catch(next)
}

pollController.handleGet = async function (req, res, next) {
  var db = new Connection()
  try {
    const foundPoll = await db.models.poll.findOne({
      where: {
        id: req.params.pollId
      },
      group: ['pollOptions.id'],
      // We only care about the question field
      attributes: ['question'],
      include: {
        model: db.models.pollOption,
        attributes: [
          // Use id as optionId
          ['id', 'optionId'],
          'text',
          [db.sequelize.fn('COUNT', db.sequelize.col('pollOptions.votes.id')), 'voteCount']
        ],
        include: {
          model: db.models.vote,
          attributes: []
        }
      }
    })
    res.status(200).json(foundPoll.dataValues)
  } catch (err) {
    next(err)
  }
}
export default pollController
