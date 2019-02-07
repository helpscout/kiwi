const execa = require("execa");
const git = require("./git");
const { generateFiles } = require("./generateFiles");

exports.syncRepo = async repo => {
  try {
    await execa.shell(`cd ../${repo}`);

    await git.pullLatest();

    await generateFiles(repo);

    const isClean = await git.isWorkingTreeClean();
    if (isClean) return Promise.resolve();

    await git.commitAllChangesAndPush();

    await execa.shell("cd -");

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
