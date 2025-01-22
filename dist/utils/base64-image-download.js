function base64ImageDownload(base64Image, filename) {
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = base64Image;
  a.download = filename;
  a.click();
}

export { base64ImageDownload as default };
//# sourceMappingURL=base64-image-download.js.map
