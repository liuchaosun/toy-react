/**
 * 使用 Range Api 对插入节点做处理
 * 1. 先插入节点 node， node出现在 range 最前
 * 2. 把 range 挪到 node 之后
 * 3. 删除 range 里的旧内容
 * 4. range 设置回 node 前后
 * @param {*} range
 * @param {*} node
 */
export function replaceContent(range, node) {
  // 1
  range.insertNode(node);
  // 2
  range.setStartAfter(node);
  // 3
  range.deleteContents();
  // 4
  range.setStartBefore(node);
  range.setEndAfter(node);
}

/**
 * 1. type节点类型是否相同
 * 2. props 是否相同 -- 数量和值
 * 3. #text context 是否相同
 *
 * React中对children是否相同很关键，diff算法主要在这里起作用 -- TODO 必须学习
 * @param {*} oldNode
 * @param {*} newNode
 */
export function isSameNode(oldNode, newNode) {
  // 1
  if (oldNode.type !== newNode.type) {
    return false;
  }

  //  2
  if (Object.keys(oldNode.props).length !== Object.keys(newNode.props).length) {
    return false;
  }
  for (let name in newNode.props) {
    if (newNode.props[name] !== oldNode.props[name]) {
      return false;
    }
  }

  // 3
  if (newNode.type === '#text' && newNode.context !== oldNode.context) {
    return false;
  }

  return true;
}
