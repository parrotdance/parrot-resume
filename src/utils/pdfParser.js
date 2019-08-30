import html2canvas from 'html2canvas';
import JSPDF from 'jspdf';

const paper = {
  'a4': { width: 595.28, height: 841.89 }
};

/**
 * @desc 将 markdown 解析的 HTML 节点克隆到一个标准尺寸的 div 元素挂载到屏幕外侧
 * @param el 要渲染为 canvas 的元素
 * @param paperSize 纸张大小
 * @return HTMLDivElement
 */
function getResultBoard(el, paperSize) {
  const wrapper = document.createElement('div');
  wrapper.style.width = paper[paperSize].width + 'px';
  wrapper.style.height = paper[paperSize].height + 'px';
  for(const item of el.children) {
    wrapper.appendChild(item.cloneNode(true));
  }
  wrapper.style.position = 'fixed';
  wrapper.style.left = '0';
  wrapper.style.top = 2 * wrapper.style.height;
  wrapper.style.padding = '12px 24px';
  document.body.appendChild(wrapper);
  wrapper.done = () => document.body.removeChild(wrapper);
  return wrapper;
}

export default async function parser(el, paperSize, fileName) {
  const result = getResultBoard(el, paperSize)
  const canvas = await html2canvas(result);
  const jsPDF = new JSPDF('', 'pt', paperSize);
  const pageImg = canvas.toDataURL('image/jpeg', 1.0);
  jsPDF.addImage(pageImg, 'JPEG', 0, 0, paper[paperSize].width, paper[paperSize].height);
  jsPDF.save(fileName || 'file.pdf');
  result.done();
}