import { helper } from '@ember/component/helper';

function toJson(params, options) {
  var object = params[0];
  return object.toJSON(options);
}
var toJson$1 = helper(toJson);

export { toJson$1 as default, toJson };
//# sourceMappingURL=to-json.js.map
