const crypto = require("crypto");
const secret = process.env.KIWI_SECRET || "hsds-secret-lol-buzz";
const headerKey = "x-hub-signature";

exports.secret = secret;
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

exports.isDataSecure = response => {
  const { headers, body } = response;
  const payload = JSON.stringify(body);

  const hmac = crypto.createHmac("sha1", secret);
  const digest = "sha1=" + hmac.update(payload).digest("hex");
  const checksum = headers[headerKey];

  if (!checksum || !digest || checksum !== digest) {
    return false;
  }

  return true;
};
