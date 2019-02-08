#!/usr/bin/env node
const { log } = require("./utils");
const { syncRepo } = require("./syncRepo");
const pkg = require("./package.json");

log("🥝", "", `Kiwi Started! (v${pkg.version})`);

syncRepo();
