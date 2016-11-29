import Connection from 'sequelize-connect'

const voteController = { }

voteController.handlePost = async function (req, res, next) {
  try {
    var db = new Connection()
    await db.models.vote.create({
      pollOptionId: req.body.pollOptionId
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
}

export default voteController
