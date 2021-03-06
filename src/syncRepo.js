const path = require('path')
const execa = require('execa')
const {generateFiles} = require('./generateFiles')
const {getTimestamp, log} = require('./utils')

const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_USER = process.env.GITHUB_USER
const TOKEN = process.env.TOKEN

exports.syncRepo = async () => {
  const wikiRepo = `${GITHUB_REPO}.wiki`

  try {
    log(`Cloning ${wikiRepo}...`)

    await execa.shell(`rm -rf ${GITHUB_REPO}.wiki`)
    await execa.shell(`
      git clone https://${TOKEN}@github.com/${GITHUB_USER}/${GITHUB_REPO}.wiki.git
    `)

    log(`Syncing ${wikiRepo}...`)

    await generateFiles(GITHUB_REPO)

    const {stdout: hasChanges} = await execa.shell(`
      cd ${wikiRepo}
      git status --porcelain
    `)

    if (!hasChanges) {
      log(`No changes on ${wikiRepo}`)
      log(`Cleaning ${wikiRepo}...`)

      await execa.shell(`rm -rf ${GITHUB_REPO}.wiki`)

      log('🥝', '', `Kiwi sync complete!`)
      return Promise.resolve()
    }

    await execa.shell(`
      cd ${wikiRepo}
      git add .
      git commit -m "Update from Kiwi at ${getTimestamp()}"
      git push https://${TOKEN}@github.com/${GITHUB_USER}/${GITHUB_REPO}.wiki.git
    `)

    log(`Pushed updates to ${wikiRepo}`)

    log(`Cleaning ${wikiRepo}...`)

    await execa.shell(`rm -rf ${GITHUB_REPO}.wiki`)

    log('🥝', '', `Kiwi sync complete!`)

    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}
