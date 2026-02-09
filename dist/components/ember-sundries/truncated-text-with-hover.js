import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if this.truncated}}\n  <EmberSundries::BasicDropdownHover>\n    <:triggerComponent>\n      {{this.truncated}}{{this.afterTruncatedText}}\n    </:triggerComponent>\n    <:contentComponent>\n      <div\n        class=\"box-arrow bg-white body-text monospaced border rounded padding-lg card-box-shadow\"\n      >\n        {{@text}}\n      </div>\n    </:contentComponent>\n  </EmberSundries::BasicDropdownHover>\n{{else}}\n  {{@text}}\n{{/if}}");

class TruncatedTextWithHover extends Component {
  afterTruncatedText = '...';
  static {
    g(this.prototype, "text", [tracked]);
  }
  #text = (i(this, "text"), undefined);
  static {
    g(this.prototype, "maxChars", [tracked], function () {
      return 3;
    });
  }
  #maxChars = (i(this, "maxChars"), undefined);
  get truncated() {
    if (this.args.text.split('').length > this.args.maxChars) {
      return this.args.text.split('').slice(0, this.args.maxChars).join('');
    }
    return null;
  }
}
setComponentTemplate(TEMPLATE, TruncatedTextWithHover);

export { TruncatedTextWithHover as default };
//# sourceMappingURL=truncated-text-with-hover.js.map
