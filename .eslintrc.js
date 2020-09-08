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
      jsx: true, // 启用 JSX
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
    // 对象，换行后字段末尾自动加逗号
    'comma-dangle': [2, 'only-multiline'],
    'prettier/prettier': 2,
  },
};
