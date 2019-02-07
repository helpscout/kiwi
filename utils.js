exports.REPOS = ["hsds-core-ui"];

exports.getTimestamp = () => {
  return new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
};

exports.log = (...args) => {
  console.log(`[${exports.getTimestamp()}]`, ...args);
};

exports.isMasterBranch = (data = {}) => {
  const { ref } = data;
  return ref === "refs/heads/master";
};
