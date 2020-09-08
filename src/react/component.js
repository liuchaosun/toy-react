export const RENDER_TO_DOM = Symbol('render to dom');

/**
 * 文本节点类
 */
export class TextWrapper {
  constructor(context) {
    this.root = document.createTextNode(context);
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
}

/**
 * 元素节点类
 */
export class ElementWrapper {
  constructor(type) {
    // 初始化dom元素节点对象 挂载到 根节点 root
    this.root = document.createElement(type);
  }
  // html 对象的属性绑定
  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      // 绑定事件
      this.root.addEventListener(
        RegExp.$1.replace(/^[\s\S]/, (c) => c.toLowerCase()),
        value
      );
    } else {
      if (name === 'className') {
        name = 'class';
      }
      this.root.setAttribute(name, value);
    }
  }
  appendChild(component) {
    // dom 节点最后加入节点
    let range = document.createRange();
    range.setStart(this.root, this.root.childNodes.length);
    range.setEnd(this.root, this.root.childNodes.length);
    component[RENDER_TO_DOM](range);
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
}

/**
 * 自定义组件基类
 */
export class Component {
  constructor() {
    // 存放传递从父组件接收的值 {}
    this.props = Object.create(null);
    // 子节点
    this.children = [];
    // 根节点
    this._root = null;
    this._range = null;
  }
  setAttribute(name, value) {
    this.props[name] = value;
  }
  appendChild(component) {
    this.children.push(component);
  }
  [RENDER_TO_DOM](range) {
    this._range = range;
    this.render()[RENDER_TO_DOM](range);
  }
  rerender() {
    this._range.deleteContents();
    this[RENDER_TO_DOM](this._range);
  }
  /**
   * 修改state数据并且重新 render
   * newState 是一个对象,所以可能涉及到深拷贝
   * @param {Object} newState
   */
  setState(newState) {
    if (this.state === null || typeof this.state !== 'object') {
      this.state = newState;
      this.rerender();
      return;
    }
    /**
     * 深拷贝合并数据,将新的状态所有数据合并到老的状态上
     * @param {Obejct} oldState
     * @param {Obejct} newState
     */
    let merge = (oldState, newState) => {
      for (let p in newState) {
        if (oldState[p] === null || typeof oldState[p] !== 'object') {
          oldState[p] = newState[p];
        } else {
          merge(oldState[p], newState[p]);
        }
      }
    };

    merge(this.state, newState);
    this.rerender();
    return;
  }
}
