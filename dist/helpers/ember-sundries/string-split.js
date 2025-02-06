import { helper } from '@ember/component/helper';

var stringSplit = helper(function EmberSundriesStringSplit(params /*, hash*/) {
  return (params[0] || '').split(params[1] || '');
});

export { stringSplit as default };
//# sourceMappingURL=string-split.js.map
