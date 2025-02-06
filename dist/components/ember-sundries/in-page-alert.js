import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import './in-page-alert.css';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  data-test-class={{this.dataTestClass}}\n  class=\"in-page-alert {{@type}} {{this.textClass}} \"\n  ...attributes\n>\n  <SvgRepo::Icons::IconAlert\n    class={{concat \"in-page-alert-icon \" this.fillClass}}\n  />\n  {{yield}}\n</div>");

class InPageAlert extends Component {
  dataTestClass = 'in-page-alert';
  static {
    g(this.prototype, "type", [tracked]);
  }
  #type = (i(this, "type"), undefined);
  get textClass() {
    return `text-${this.args.type}`;
  }
  get fillClass() {
    return `fill-${this.args.type}`;
  }
}
setComponentTemplate(TEMPLATE, InPageAlert);

export { InPageAlert as default };
//# sourceMappingURL=in-page-alert.js.map
