const globals = require("globals");
const commonRules = require("./common-rules");

module.exports = {
  plugins: {
    "6river": require("../plugin"),
  },
  rules: { ...commonRules },
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
};
