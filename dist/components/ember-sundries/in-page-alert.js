import Component from '@glimmer/component';
import './in-page-alert.css';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  data-test-class=\"in-page-alert\"\n  class=\"in-page-alert {{@type}} {{this.textClass}} \"\n  ...attributes\n>\n  <SvgRepo::Icons::IconAlert\n    class={{concat \"in-page-alert-icon \" this.fillClass}}\n  />\n  {{yield}}\n</div>");

class InPageAlert extends Component {
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
