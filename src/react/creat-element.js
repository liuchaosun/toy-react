import { TextWrapper, ElementWrapper } from './component';

/**
 * 生成 dom 结构的函数
 * @param {*} type 可以是自定义组件 也可以是原生元素
 * @param {*} attributes 组件属性
 * @param  {...any} children 子组件
 */
function creatElement(type, attributes, ...children) {
  let ele;
  // 原生的元素传进来的是元素名 如 div 传入 'div'
  if (typeof type === 'string') {
    ele = new ElementWrapper(type);
  } else {
    // 自定义组件，调用生成实例
    ele = new type();
  }

  for (let attr in attributes) {
    ele.setAttribute(attr, attributes[attr]);
  }

  /**
   * 递归插入子节点
   * @param {*} children
   */
  let insertChildren = (children) => {
    for (let child of children) {
      // 子组件为空时跳过
      if (child === null) {
        continue;
      }
      // 子节点是文本节点
      if (typeof child === 'string') {
        child = new TextWrapper(child);
      }
      if (typeof child === 'object' && child instanceof Array) {
        insertChildren(child);
      } else {
        ele.appendChild(child);
      }
    }
  };

  if (children.length > 0) {
    insertChildren(children);
  }

  return ele;
}

export default creatElement;
