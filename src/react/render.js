import { RENDER_TO_DOM } from './module/core';

/**
 * 1. 清空 parentElement 节点下的内容
 * 2. 将 Dom 树渲染到节点中去
 * @param {Dom Tree} component
 * @param {HtmlElement} parentElement
 */
export default function (component, parentElement) {
  // 1
  let range = document.createRange();
  range.setStart(parentElement, 0);
  range.setEnd(parentElement, parentElement.childNodes.length);
  range.deleteContents();

  // 2
  component[RENDER_TO_DOM](range);
}
