/**
 * @fileoverview set of 6river eslint plugins
 * @author Nick Chistyakov
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");
const fs = require("node:fs");
const { browser } = require("globals");
const nodeMocha = require("./configs/node-mocha");
const pkg = JSON.parse(
  fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const plugin = {
  rules: requireIndex(__dirname + "/rules"),
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
};

module.exports = plugin;
