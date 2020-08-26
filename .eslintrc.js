module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [],
  settings: {},
  rules: {
    "linebreak-style": ["error", "unix"],
    "no-unused-vars": "off",
    "no-undef": "off",
  },
};
