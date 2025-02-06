import { action } from '@ember/object';
import Component from '@glimmer/component';
import isPromise from '../../utils/is-promise.js';
import { tracked } from '@glimmer/tracking';
import './print-object.css';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div class=\"print-object\" ...attributes {{did-insert this.checkPromise}}>\n  <pre>\n    {{this.parsed}}\n  </pre>\n</div>");

class PrintObject extends Component {
  static {
    g(this.prototype, "parsed", [tracked]);
  }
  #parsed = (i(this, "parsed"), undefined);
  checkPromise() {
    const object = this.args.object;
    if (isPromise(object)) {
      object.then(res => {
        this.parseObject(res);
      });
    } else {
      this.parseObject(object);
    }
  }
  static {
    n(this.prototype, "checkPromise", [action]);
  }
  parseObject(object) {
    if (object.serialize) {
      object = object.serialize({
        includeId: true
      });
    }
    (this.args.keysToRemove || []).forEach(key => {
      delete object[key];
    });
    this.parsed = JSON.stringify(object, null, 2);
  }
  static {
    n(this.prototype, "parseObject", [action]);
  }
}
setComponentTemplate(TEMPLATE, PrintObject);

export { PrintObject as default };
//# sourceMappingURL=print-object.js.map
