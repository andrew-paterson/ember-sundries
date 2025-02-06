function safeName(className) {
  var reg = /^\d+$/;
  var className = className.replace(/\s/g, '-').replace(/-+/g, '-').replace(/[^0-9a-zA-Z_-]/g, '').toLowerCase();
  var firstChar = className.split('')[0];
  if (reg.test(firstChar)) {
    className = `n-${className}`;
  }
  return className;
}

export { safeName as default };
//# sourceMappingURL=safe-name.js.map
