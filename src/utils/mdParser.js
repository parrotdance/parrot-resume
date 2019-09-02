export default function mdParser(content, name) {
  const exportBlob = new Blob([content]);
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(exportBlob);
  downloadLink.download = name;
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}