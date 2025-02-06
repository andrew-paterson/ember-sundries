import { helper } from '@ember/component/helper';

var stringReplace = helper(function emberSundriesStringReplace(params, opts) {
  const string = params[0];
  if (!string) {
    return;
  }
  if (!opts.find) {
    return string;
  }
  const replaceString = opts.replace || '';
  const re = new RegExp(opts.find, opts.flags);
  return string.replace(re, replaceString);
});

export { stringReplace as default };
//# sourceMappingURL=string-replace.js.map
