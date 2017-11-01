const path = require("path");

module.exports = (wallaby) => ({
  compilers: {
    "**/*.ts?(x)": wallaby.compilers.typeScript({
      compilerOptions: {
        target: "es3",
      },
    }),
  },

  env: {
    type: "node",
  },

  files: [
    "package.json",
    "src/**/*.ts",
    "!src/**/*.test.ts",
    "src/**/*.tsx",
    "!src/**/*.test.tsx",
  ],

  preprocessors: {
    "**/*.css": () => ({}),
  },

  setup: () => {
    const jestConfig = require("./package.json").jest;
    const cssMockFile = require("path").join(wallaby.localProjectDir, "test/jestCssPreprocessor.js");

    jestConfig.moduleNameMapper[".*\.css$"] = cssMockFile;

    wallaby.testFramework.configure(jestConfig);
  },

  testFramework: "jest",

  tests: [
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
  ],
});