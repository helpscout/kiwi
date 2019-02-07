const express = require("express");
const bodyParser = require("body-parser");
const execa = require("execa");
const { REPOS, log, isMasterBranch } = require("./utils");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res("🥝");
});

/**
 * Create a POST endpoint for every repo.
 */
REPOS.forEach(repo => {
  app.post(`/${repo}`, (req, res) => {
    const data = req.body;

    // Only wiki sync on master branch
    if (isMasterBranch(data)) {
      execa("sh", ["./scripts/sync-wiki.sh"])
        .stdout.pipe(process.stdout)
        .then(() => {
          log("Successfully synced ${repo}.wiki!");
        })
        .catch(err => {
          log("Failed to sync ${repo}.wiki");
          log(err);
        });
    }

    res.sendStatus(200);
  });
});

app.listen(port, () => {
  log("🥝", "", `Kiwi Ready! (Port: ${port})`);
});
