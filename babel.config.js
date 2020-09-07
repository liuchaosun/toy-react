module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        // 可以通过这个配置 pragma 来改变生成后的参数名
        pragma: 'React.creatElement',
      },
    ],
  ],
};
