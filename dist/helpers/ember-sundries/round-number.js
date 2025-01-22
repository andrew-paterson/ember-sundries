import { helper } from '@ember/component/helper';

var roundNumber = helper(function EmberSundriesRoundNumber(params) {
  const number = typeof params[0] === 'string' ? parseFloat(params[0]) : params[0];
  return Math.round(number);
});

export { roundNumber as default };
//# sourceMappingURL=round-number.js.map
