import { action } from '@ember/object';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div class=\"labelled-checkbox {{if this.disabled \'disabled\'}}\" ...attributes>\n  {{#if this.hasLabel}}\n    <label\n      id=\"{{this.commonId}}-label\"\n      for=\"{{this.commonId}}-input\"\n      class={{@labelClass}}\n    >\n      {{#if (has-block \"labelComponent\")}}\n        {{yield to=\"labelComponent\"}}\n      {{else if @label}}\n        {{@label}}\n      {{/if}}\n    </label>\n  {{/if}}\n  <input\n    type=\"checkbox\"\n    checked={{readonly @value}}\n    {{on \"click\" this.checkboxClicked}}\n    disabled={{@disabled}}\n    id=\"{{this.commonId}}-input\"\n    name={{@name}}\n    aria-labelledby={{if this.hasLabel (concat this.commonId \"-label\")}}\n  />\n</div>");

class LabelledCheckbox extends Component {
  _uid = guidFor(this);
  get commonId() {
    return this.args.elementId || this._uid;
  }
  get hasLabel() {
    return this.args.label || this.args.labelComponent;
  }
  checkboxClicked(event) {
    if (this.args.changedAction) {
      this.args.changedAction(event.target.checked, event);
    }
  }
  static {
    n(this.prototype, "checkboxClicked", [action]);
  }
}
setComponentTemplate(TEMPLATE, LabelledCheckbox);

export { LabelledCheckbox as default };
//# sourceMappingURL=labelled-checkbox.js.map
