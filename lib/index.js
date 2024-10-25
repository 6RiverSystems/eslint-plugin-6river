const plugin = require("./plugin");

// https://eslint.org/docs/latest/extend/plugins#configs-in-plugins
Object.assign(plugin.configs, {
  "browser-jest": require("./configs/browser-jest"),
  "node-mocha": require("./configs/node-mocha"),
});

module.exports = plugin;
