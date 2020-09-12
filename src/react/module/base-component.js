/**
 * 自定义组件基类
 * 元素组件和文本组件都需要继承此基类
 */
import { RENDER_TO_DOM } from './core';
import { isSameNode } from './util';

export class BaseComponent {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._range = null;
  }
  // 属性收集
  collectAttribute(name, value) {
    this.props[name] = value;
  }
  // 子节点收集
  collectChild(child) {
    this.children.push(child);
  }
  // 虚拟dom
  get vDom() {
    return this.render().vDom;
  }
  // 延迟渲染 Dom Tree ，保存 当前的 range 和 vDom
  [RENDER_TO_DOM](range) {
    this._range = range;
    this._vDom = this.vDom; // 这里会触发 render得到一棵树
    this._vDom[RENDER_TO_DOM](range);
  }
  /**
   * 修改state数据并且重新 render
   * newState 是一个对象,所以可能涉及到深拷贝
   * @param {Object} newState
   * @param {Function} callBack
   */
  setState(newState, callBack) {
    if (this.state === null || typeof this.state !== 'object') {
      this.state = newState;
      this.update(callBack);
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
    this.update(callBack);
  }

  update(callBack) {
    let update = (oldNode, newNode) => {
      // 根节点不同 直接替换
      if (!isSameNode(oldNode, newNode)) {
        newNode[RENDER_TO_DOM](oldNode._range);
        return;
      }
      newNode._range = oldNode._range;

      let newChildren = newNode.vChildren;
      let oldChildren = oldNode.vChildren;

      if (!newChildren || !newChildren.length) {
        return;
      }

      let tailRange = oldChildren[oldChildren.length - 1]._range;

      for (let i = 0; i < newChildren.length; i++) {
        let newChild = newChildren[i];
        let oldChild = oldChildren[i];

        if (i < oldChildren.length) {
          update(oldChild, newChild);
        } else {
          // 节点变多
          let range = document.createRange();
          range.setStart(tailRange.endContainer, tailRange.endOffset);
          range.setEnd(tailRange.endContainer, tailRange.endOffset);

          newChild[RENDER_TO_DOM](range);
          tailRange = range;
        }
      }
    };

    let vDom = this.vDom;
    new Promise((resolve) => {
      update(this._vDom, vDom);
      resolve();
    }).then(() => {
      // 保留旧的dom树
      this._vDom = vDom;
      callBack && callBack();
    });
  }
}
