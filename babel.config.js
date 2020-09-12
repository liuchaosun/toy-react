module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        // 可以通过这个配置 pragma 来改变生成后的参数名
        // JSX 默认是 React.creatElement,这里修改下
        pragma: 'React.createElement',
      },
    ],
  ],
};
