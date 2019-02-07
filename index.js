const express = require("express");
const bodyParser = require("body-parser");
const { syncRepo } = require("./syncRepo");
const { REPOS, log, isMasterBranch, isDataSecure } = require("./utils");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("🥝");
});

/**
 * Create a POST endpoint for every repo.
 */
REPOS.forEach(repo => {
  app.post(`/${repo}`, (req, res) => {
    const data = req.body;

    if (!isDataSecure(req)) {
      return res.sendStatus(404);
    }

    if (!isMasterBranch(data)) {
      return res.sendStatus(200);
    }

    syncRepo(repo);

    return res.sendStatus(200);
  });
});

app.listen(port, () => {
  log("🥝", "", `Kiwi Ready! (Port: ${port})`);
});
