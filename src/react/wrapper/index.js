/**
 * 元素
 */
export class ElememntWrapper {
  constructor(type) {
    // 初始化dom元素节点对象 挂载到 根节点 root
    this.root = document.createElement(type);
  }
  setAttribute(name, val) {
    // html 对象的 setAttribute
    this.root.setAttribute(name, val);
  }
  appendChild(component) {
    // dom 节点下加入节点
    this.root.appendChild(component.root);
  }
}

/**
 * 文本
 */
export class TextWrapper {
  constructor(context) {
    this.root = document.createTextNode(context);
  }
}
