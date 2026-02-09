import { helper } from '@ember/component/helper';

function EmberSundriesSimpleAddition(params /*, hash*/) {
  return params.reduce((acc, item) => {
    return acc + item;
  }, 0);
}
var simpleAddition = helper(EmberSundriesSimpleAddition);

export { EmberSundriesSimpleAddition, simpleAddition as default };
//# sourceMappingURL=simple-addition.js.map
