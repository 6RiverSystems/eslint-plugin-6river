const globals = require("globals");
const commonRules = require("./common-rules");
const mocha = require("eslint-plugin-mocha");

module.exports = {
  plugins: {
    mocha: mocha,
    "6river": require("../plugin"),
  },
  rules: { ...commonRules, "mocha/no-exclusive-tests": "error" },
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.mocha,
    },
  },
};
