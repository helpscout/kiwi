#!/usr/bin/env node
const { log } = require("./utils");
const { syncRepo } = require("./syncRepo");

log("🥝", "", `Kiwi Started!`);

syncRepo();
