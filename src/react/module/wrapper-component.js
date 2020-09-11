import { RENDER_TO_DOM } from './core';
import { replaceContent } from './util';
import { BaseComponent } from './base-component';

/**
 * 元素节点类
 */
export class ElementWrapper extends BaseComponent {
  constructor(type) {
    super(type);
    this.type = type;
  }
  // 虚拟dom
  get vDom() {
    this.vChildren = this.getCollectedVChildren();
    return this;
  }
  getCollectedVChildren() {
    return this.children.map((child) => child.vDom);
  }

  [RENDER_TO_DOM](range) {
    this._range = range;

    let root = document.createElement(this.type);

    // 处理属性
    for (let name in this.props) {
      let value = this.props[name];
      if (name.match(/^on([\s\S]+)$/)) {
        // 绑定事件
        root.addEventListener(
          RegExp.$1.replace(/^[\s\S]/, (c) => c.toLowerCase()),
          value
        );
      } else {
        if (name === 'className') {
          name = 'class';
        }
        root.setAttribute(name, value);
      }
    }

    if (!this.vChildren && this.children.length > 0) {
      this.vChildren = this.getCollectedVChildren();
    }
    // 递归处理所有子节点
    for (let child of this.vChildren) {
      let childRange = document.createRange();
      childRange.setStart(root, root.childNodes.length);
      childRange.setEnd(root, root.childNodes.length);
      child[RENDER_TO_DOM](childRange);
    }

    replaceContent(range, root);
  }
}

/**
 * 文本节点类--无子节点，返回自身
 */
export class TextWrapper extends BaseComponent {
  constructor(context) {
    super(context);
    this.type = '#text';
    this.context = context;
  }
  get vDom() {
    return this;
  }
  [RENDER_TO_DOM](range) {
    this._range = range;
    replaceContent(range, document.createTextNode(this.context));
  }
}
