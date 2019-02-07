const execa = require("execa");
const { getTimestamp } = require("./utils");

exports.isWorkingTreeClean = async () => {
  try {
    const { stdout: status } = await execa("git", ["status", "--porcelain"]);
    if (status !== "") {
      return false;
    }

    return true;
  } catch (_) {
    return false;
  }
};

exports.pullLatest = async () => {
  try {
    await execa.shell("git clean -f -d");
    await execa.shell("git checkout .");
    await execa.shell("git pull");

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.commitAllChangesAndPush = async () => {
  try {
    await execa.shell("git add .");
    await execa.shell(`git commit -m "Update from Kiwi at ${getTimestamp()}"`);
    await execa.shell("git push");

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
