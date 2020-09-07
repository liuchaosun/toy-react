// 开启后，代码编写阶段就进行格式校验和自动格式化
// 官方资料：https://prettier.io/docs/en/options.html
module.exports = {
  // 文件一行最大长度，Default 80
  printWidth: 100,
  // 每行末尾自动添加分号， Default	true
  semi: true,
  // 字符串使用单引号， Default false
  singleQuote: true,
  // 对象的key仅在必要时使用引号，Default 'as-needed'
  quoteProps: 'as-needed',
  // jsx不使用单引号， Default false
  jsxSingleQuote: false,
  // 末尾需要逗号，Default 'es5'
  trailingComma: 'es5',
  // 大括号内的首尾需要空格， Default true
  bracketSpacing: true,
  // jsx的标签的反尖括号保持同行， Default false
  jsxBracketSameLine: true,
  // 箭头函数参数总是需要加括号，Default 'always'
  arrowParens: 'always',
  // 根据显示样式决定 html 是否需要换行，Default 'css'
  htmlWhitespaceSensitivity: 'css',
  // 是否需要引入 @prettier， Default	false
  requirePragma: false,
  // 是否需要插入 @prettier， Default	false
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 每次更新都是整个文件
  rangeStart: 0,
  rangeEnd: Infinity,
};
