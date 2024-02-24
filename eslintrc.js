module.exports = {
  env: {
    es6: true,
    node: true,
  },
  // Extends the recommended ESLint config and Prettier plugin
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // Make sure this is the last element in the array
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'prettier', // This is not necessary if you're using 'plugin:prettier/recommended'
  ],
  rules: {
    'no-unused-vars': 'warn',

    // This is not necessary if you're using 'plugin:prettier/recommended'
    'prettier/prettier': 'error',
  },
};
