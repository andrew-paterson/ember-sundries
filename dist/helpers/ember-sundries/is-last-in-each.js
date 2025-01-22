import { helper } from '@ember/component/helper';

function EmberSundriesIsLastInEach(params /*, hash*/) {
  if (params[0] === params[1] + 1) {
    return true;
  }
  return false;
}
var isLastInEach = helper(EmberSundriesIsLastInEach);

export { EmberSundriesIsLastInEach, isLastInEach as default };
//# sourceMappingURL=is-last-in-each.js.map
