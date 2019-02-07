const execa = require("execa");
const { generateFiles } = require("./generateFiles");
const { getTimestamp } = require("./utils");

exports.syncRepo = async repo => {
  try {
    const wikiRepo = `${repo}.wiki`;
    await execa.shell(`
      cd ../${wikiRepo}
      pwd
      git clean -f -d
      git checkout .
      git pull
    `);

    await generateFiles(repo);

    const isClean = await execa.shell(`
      cd ../${wikiRepo}
      git status --porcelain
    `);

    if (isClean) return Promise.resolve();

    await execa.shell(`
      cd ../${wikiRepo}
      git add .
      git commit -m "Update from Kiwi at ${getTimestamp()}"
      git push
    `);

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.syncRepo("hsds-core-ui");
