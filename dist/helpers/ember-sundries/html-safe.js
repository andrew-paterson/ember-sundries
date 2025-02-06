import { helper } from '@ember/component/helper';
import { htmlSafe as htmlSafe$1 } from '@ember/template';

function htmlSafeHelper(params) {
  if (!params[0]) {
    return;
  }
  return htmlSafe$1(params[0]);
}
var htmlSafe = helper(htmlSafeHelper);

export { htmlSafe as default, htmlSafeHelper };
//# sourceMappingURL=html-safe.js.map
