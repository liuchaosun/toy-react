module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};
