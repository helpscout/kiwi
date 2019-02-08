const execa = require("execa");
const { generateFiles } = require("./generateFiles");
const { getTimestamp, log } = require("./utils");

exports.syncRepo = async repo => {
  try {
    log(`Syncing ${repo}...`);

    await generateFiles(repo);

    const { stdout: hasChanges } = await execa.shell(`
      cd ${wikiRepo}
      git status --porcelain
    `);

    if (!hasChanges) {
      log(`No changes on ${wikiRepo}`);
      return Promise.resolve();
    }

    await execa.shell(`
      cd ${wikiRepo}
      git add .
      git commit -m "Update from Kiwi at ${getTimestamp()}"
      git push
    `);

    log(`Pushed updates to ${wikiRepo}`);

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
