exports.getTimestamp = () => {
  return new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
};

exports.log = (...args) => {
  console.log(`[${exports.getTimestamp()}]`, ...args);
};
