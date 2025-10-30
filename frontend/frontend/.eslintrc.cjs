module.exports = {
  root: true,
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
  env: { browser: true, es2021: true, node: true },
  extends: ['eslint:recommended'],
  plugins: ['lit'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off'
  }
};
