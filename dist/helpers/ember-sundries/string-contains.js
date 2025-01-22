import { helper } from '@ember/component/helper';

function stringContains(params /*, hash*/) {
  var testString = params[0].toLowerCase();
  var searchString = params[1].toLowerCase();
  return testString.indexOf(searchString) > -1;
}
var stringContains$1 = helper(stringContains);

export { stringContains$1 as default, stringContains };
//# sourceMappingURL=string-contains.js.map
