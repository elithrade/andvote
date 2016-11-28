import express from 'express'
import Connection from 'sequelize-connect'
import chalk from 'chalk'
import path from 'path'
import pollController from './controllers/pollController'
import bodyParser from 'body-parser'

async function connect () {
  var discover = path.join(__dirname, 'models')
  var matcher = function shouldImportModel (modelFileName) {
    return true
  }
  await new Connection(
    'andvote_schema',
    'root',
    '', {
      dialect: 'mysql'
    },
    discover,
    matcher,
    console)
}

(async function () {
  try {
    await connect()
  } catch (err) {
    console.log(chalk.red(`An error occured when connecting: ${err}`))
  }
  const app = express()
  app.use(bodyParser.json())
  app.post('/poll', pollController.handlePost)
  app.get('/poll/:pollId', pollController.handleGet)

  const port = 3000
  app.listen(port, () => console.log(chalk.green(`Running on port ${port}`)))
})()
