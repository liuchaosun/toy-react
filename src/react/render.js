import { RENDER_TO_DOM } from './component';
export default function (component, parentElement) {
  // 清空节点下的内容
  let range = document.createRange();
  range.setStart(parentElement, 0);
  range.setEnd(parentElement, parentElement.childNodes.length);
  range.deleteContents();
  // 渲染到节点中去
  component[RENDER_TO_DOM](range);
}
