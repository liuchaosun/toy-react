/**
 * eslint 配置
 */
module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parser: 'babel-eslint',
  // 解析器配置
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],

  rules: {
    eqeqeq: [2, 'always'],
    'no-unused-vars': 1,
    'no-debugger': 1,
    // 'no-console': 1,
    'comma-dangle': [2, 'only-multiline'],
    'prettier/prettier': 2,
  },
};
