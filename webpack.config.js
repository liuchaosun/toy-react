module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
  },
  mode: 'none',
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
