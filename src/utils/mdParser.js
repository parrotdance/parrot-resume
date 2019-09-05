import MarkdownIt from 'markdown-it';

const OPTION = {
  breaks: true
};
const INJECT_LINE_RULE = [
  'paragraph_open',
  'heading_open',
  'blockquote_open',
  'hr',
  'ordered_list_open',
  'bullet_list_open',
  'table_open',
  'list_item_open',
  'link_open'
]

function injectLineNumbers(parserInstance, rules) {
  const lineNumberMaker = (tokens, idx, options, env, slf) => {
    var line;
    if (tokens[idx].map && tokens[idx].level === 0) {
      line = tokens[idx].map[0];
      tokens[idx].attrJoin('class', 'line');
      tokens[idx].attrSet('data-line', String(line));
    }
    return slf.renderToken(tokens, idx, options, env, slf);
  }
  rules.forEach(rule => {
    parserInstance.renderer.rules[rule] = lineNumberMaker;
  });
}


function getMdParser() {
  const mdParserInstance = new MarkdownIt('commonmark', OPTION);
  injectLineNumbers(mdParserInstance, INJECT_LINE_RULE);
  return mdParserInstance;
}

export const mdParser = getMdParser();

export function mdDownloader(content, name) {
  const exportBlob = new Blob([content]);
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(exportBlob);
  downloadLink.download = name;
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}