import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import './simplebar.css';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if this.contentWidth}}\n  <SimpleBar\n    {{style this.style}}\n    class={{@wrapperClass}}\n    @autoHide={{@autoHide}}\n    as |sb|\n  >\n    {{yield}}\n  </SimpleBar>\n{{else}}\n  <div\n    class=\"dummy {{@wrapperClass}}\"\n    {{did-insert this.onInsert}}\n    style=\"overflow-y: hidden\"\n  >\n    {{yield}}\n  </div>\n{{/if}}");

class EmberSundriesSimpleBar extends Component {
  static {
    g(this.prototype, "contentWidth", [tracked]);
  }
  #contentWidth = (i(this, "contentWidth"), undefined);
  get style() {
    return {
      width: `${this.contentWidth}px`
    };
  }
  onInsert(element) {
    if (!element) {
      return;
    }
    setTimeout(() => {
      // Because sometimes Chromium initially renders inline-flex elements with an extar 40px width.
      this.contentWidth = element.offsetWidth;
    }, 1);
  }
  static {
    n(this.prototype, "onInsert", [action]);
  }
}
setComponentTemplate(TEMPLATE, EmberSundriesSimpleBar);

export { EmberSundriesSimpleBar as default };
//# sourceMappingURL=simplebar.js.map
