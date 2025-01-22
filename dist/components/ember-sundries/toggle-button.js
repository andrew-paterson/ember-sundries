import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import './toggle-button.css';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div data-test-on={{if @on true}} ...attributes>\n  {{#if @togglerLabel}}\n    <label\n      id=\"{{this.uid}}-label\"\n      for=\"{{this.uid}}-button\"\n      class={{@togglerLabelClass}}\n    >{{@togglerLabel}}</label>\n  {{/if}}\n  <button\n    class=\"toggle-button {{if @on \'on\'}}\"\n    data-test-class=\"toggle-button\"\n    id=\"{{this.uid}}-button\"\n    aria-labelledby=\"{{this.uid}}-label\"\n    {{on \"click\" (fn @onClick @on)}}\n  >\n    <div class=\"toggle-button-switch\"></div>\n  </button>\n</div>");

class EmberSundriesToggleButtonComponent extends Component {
  get uid() {
    return this.args.togglerId || guidFor(this);
  }
}
setComponentTemplate(TEMPLATE, EmberSundriesToggleButtonComponent);

export { EmberSundriesToggleButtonComponent as default };
//# sourceMappingURL=toggle-button.js.map
