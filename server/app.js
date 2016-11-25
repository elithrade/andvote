import express from 'express'
import Connection from 'sequelize-connect'
import chalk from 'chalk'
import path from 'path'

async function connect () {
  var discover = [path.join(__dirname, 'models')]
  var matcher = function shouldImportModel (modelFileName) {
    return true
  }
  await new Connection(
    'andvote_schema',
    'root',
    '',
    {
      dialect: 'mysql',
      port: 3306
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
  const port = 3000

  app.listen(port, () => console.log(`Running on port ${port}`))
})()
