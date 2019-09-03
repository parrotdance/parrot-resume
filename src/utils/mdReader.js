export default function mdReader() {
  return new Promise((resolve, reject) => {
    const inputEl = document.createElement('input');
    inputEl.type = 'file';
    inputEl.style.display = 'none';
    inputEl.accept = '.md, .txt';
    inputEl.onchange = () => {
      inputEl.files[0].text().then(result => {
        resolve(result);
      })
    }
    document.body.appendChild(inputEl);
    inputEl.click();
  })
}