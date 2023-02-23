module.exports = {
  extends: [
    "alloy",
    "alloy/react",
    "alloy/typescript",
    "plugin:react-hooks/recommended",
  ],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    React: false,
  },
  rules: {
    "max-nested-callbacks": ["error", 4],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
