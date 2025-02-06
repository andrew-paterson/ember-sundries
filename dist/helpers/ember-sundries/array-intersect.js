import { helper } from '@ember/component/helper';

var arrayIntersect = helper(function emberSundriesArrayIntersect(positional) {
  const intersection = positional[0].filter(item => positional[1].includes(item));
  return intersection.length > 0 ? intersection : null;
});

export { arrayIntersect as default };
//# sourceMappingURL=array-intersect.js.map
