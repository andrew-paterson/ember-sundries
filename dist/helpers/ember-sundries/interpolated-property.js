import { helper } from '@ember/component/helper';

function interpolatedProperty(params) {
  var baseObject = params[0];
  var property = params[1];
  return baseObject[property];
}
var interpolatedProperty$1 = helper(interpolatedProperty);

export { interpolatedProperty$1 as default, interpolatedProperty };
//# sourceMappingURL=interpolated-property.js.map
