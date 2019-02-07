const execa = require("execa");
const { generateFiles } = require("./generateFiles");
const { getTimestamp } = require("./utils");

exports.syncRepo = async repo => {
  try {
    await execa.shell(`cd ../${repo}`);
    await execa.shell("git clean -f -d");
    await execa.shell("git checkout .");
    await execa.shell("git pull");

    await generateFiles(repo);

    await execa.shell("git add .");
    await execa.shell(`git commit -m "Update from Kiwi at ${getTimestamp()}"`);
    await execa.shell("git push");
    await execa.shell("cd -");

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
