# toy-react

自己的动手实现一个玩具版的 React。

## 一些问题

有几个问题需要自问：

1. Virtual DOM 的工作原理
2. React 与 Vue 在架构上有什么不同
3. 你怎么理解 MVC 框架呢？能不能举个例子说明

需要学习到的知识点：

1. 虚拟 DOM
2. JSX
3. 类组件
4. 函数组件
5. 事件
6. 组件生命周期
7. MVC
8. Hooks

## 开始实现 ToyReact

### 前置准备 node

本地环境需要安装 nodejs（[下载地址](https://nodejs.org/en/)）

### 初始化项目

```bash
  npm init -y
```

在生成后的文件中输入自己的项目的信息

### 配置 webpack + babel

需要明白的一个基础知识是：React 框架不被浏览器原生支持，所以源码必须要经过事先编译后，再进行生产部署，我们使用常见的构建工具 webpack，配合目前最流行的代码转译工具 babel 实现编译。

安装 webpack

```bash
npm install -D webpack webpack-cli
```

安装 babel

```bash
npm install -D @babel/core @babel/preset-env babel-loader
```

这里是一份可用的 [webpack 配置](./webpack.config.js)

其中配置一段配置是想要让编译后的代码方便阅读

```javascript
  mode: 'none',
  optimization: {
    minimize: false,
  }
```

如果是真实项目中使用应该配置为:

```javascript
  mode: 'production',
  optimization: {
    minimize: true,
  }
```

这里是 [babel 配置](./babel.config.js)

本项目中 prettier + eslint 部分仅是为了方便编码使用，可以不关心，有兴趣请自行学习，babel 部分同样。

### 启动编译

创建一个 src/index.js，随便输入一段测试代码，然后在 npm scripts 配置中新增编译命令

```JSON
"scripts": {
  "build": "webpack"
},
```

控制台执行 npm run build ，dist/index.js 生成，引入 html 中检查，使用正常。

### 添加 JSX 支持

JSX 是 React 框架使用的一个核心内容，虽然 React 官方强调可以不写 JSX，但是那种方式编写代码十分麻烦，所以还是以 JSX 为主。

在 index.js 中写入一段 JSX 代码，如果不添加其他插件支持编译会报错，需要增加插件 @babel/plugin-transform-react-jsx（配置见 babel.config.js）

```javascript
let a = (
  <div id="1">
    <div>1</div>
    <div>2</div>
  </div>
);
```

经过编译后的代码为：

```javascript
let a = React.creatElement(
  'div',
  {
    id: '1',
  },
  React.creatElement('div', null, '1'),
  React.creatElement('div', null, '2')
);
```

可以看到一段 JSX 代码经过解析后变为了一段函数调用，默认该函数是 React.creatElement，接收的第一个参数是元素名字符串，第二个参数是元素具有的属性，后面的其他参数都是第一个元素的子元素，以此类推。

可以修改 @babel/plugin-transform-react-jsx 插件的 pragma 配置，改为你任意想要的函数名。

### 实现 creatElement

creatElement 的具体实现可以查看文件[creat-element.js](./src/react/creat-element.js)

需要说明的是函数的第一个参数 type 具有多种类型，例如元素节点类型\'div\'，自定义组件 MyComponent 等

React 中默认大写开头的元素是自定义组件，所以 div 和 Div 是不同的。

### 包装 Wrapper

为了统一自定义组件和元素组件的表现形式统一，需要对元素组件也包装一个 class 出来，包装后的几个 类 可以见 [component.js](./src/react/component.js)。

包装出来的几个类需要具备几乎相同的事件和部分属性

### 渲染函数

通过一个渲染函数将组件中的内容真正的添加到 html 的元素中，具体实现见[render.js](./src/react/render.js)
