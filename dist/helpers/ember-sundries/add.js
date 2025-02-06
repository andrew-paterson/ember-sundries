import { helper } from '@ember/component/helper';

function add(params) {
  var total = 0;
  params.forEach(param => {
    total += parseInt(param);
  });
  return total;
}
var add$1 = helper(add);

export { add, add$1 as default };
//# sourceMappingURL=add.js.map
