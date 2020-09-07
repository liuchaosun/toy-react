class Component {
  constructor() {
    // 存放传递从父组件接收的值 {}
    this.props = Object.create(null);
    // 子节点
    this.children = [];
    // 根节点
    this._root = null;
  }

  setAttribute(name, value) {
    this.props[name] = value;
  }

  appendChild(component) {
    this.children.push(component);
  }

  get root() {
    if (!this._root) {
      this._root = this.render().root;
    }
    return this._root;
  }
}

export default Component;
