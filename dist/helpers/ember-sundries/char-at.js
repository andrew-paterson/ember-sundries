import { helper } from '@ember/component/helper';

var charAt = helper(function emberSundriesCharAt(positional) {
  const [string, index] = positional;
  return string[index];
});

export { charAt as default };
//# sourceMappingURL=char-at.js.map
