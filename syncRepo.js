const execa = require("execa");
const { generateFiles } = require("./generateFiles");
const { getTimestamp, log } = require("./utils");

exports.syncRepo = async repo => {
  try {
    const wikiRepo = `${repo}.wiki`;

    // Get the latest from Repo
    await execa.shell(`
      cd ../${repo}
      git clean -f -d
      git checkout .
      git pull
    `);

    // Get the latest from Repo.wiki
    await execa.shell(`
      cd ../${wikiRepo}
      git clean -f -d
      git checkout .
      git pull
    `);

    await generateFiles(repo);

    const { stdout: hasChanges } = await execa.shell(`
      cd ../${wikiRepo}
      git status --porcelain
    `);

    if (!hasChanges) {
      log(`No changes on ${wikiRepo}`);
      return Promise.resolve();
    }

    await execa.shell(`
      cd ../${wikiRepo}
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
