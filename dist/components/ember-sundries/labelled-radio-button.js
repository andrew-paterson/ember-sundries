import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"labelled-radio-button {{if this.disabled \'disabled\'}}\"\n  ...attributes\n>\n  <RadioButton\n    @value={{@value}}\n    @groupValue={{@groupValue}}\n    @name={{@name}}\n    @changed={{@changedAction}}\n    @radioId={{concat @elementId \"-\" @value}}\n  >\n    {{#if @labelComponent}}{{component @labelComponent}}{{else if\n      @label\n    }}{{@label}}{{/if}}\n  </RadioButton>\n</div>");

class LabelledRadioButton extends Component {}
setComponentTemplate(TEMPLATE, LabelledRadioButton);

export { LabelledRadioButton as default };
//# sourceMappingURL=labelled-radio-button.js.map
