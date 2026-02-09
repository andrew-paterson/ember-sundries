import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import './toggle-button.css';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div data-test-class=\"toggler\" ...attributes>\n  {{#if @togglerLabel}}\n    {{#unless @hideLabel}}\n      <label\n        id=\"{{this.uid}}-label\"\n        for=\"{{this.uid}}-button\"\n        class={{@togglerLabelClass}}\n      >{{@togglerLabel}}</label>\n    {{/unless}}\n  {{/if}}\n  {{#if @requestInFlight}}\n    {{#if (has-block \"requestInFlightContent\")}}\n      <div\n        class=\"toggle-button request-in-flight\"\n        data-test-class=\"toggle-button-request-in-flight\"\n      >\n        {{yield to=\"requestInFlightContent\"}}\n      </div>\n    {{/if}}\n  {{else}}\n    <button\n      type=\"button\"\n      class=\"toggle-button {{if @on \'on\'}} {{if @disabled \'disabled\'}}\"\n      data-test-class=\"toggle-button\"\n      id=\"{{this.uid}}-button\"\n      aria-labelledby={{unless @hideLabel (concat this.uid \"-label\")}}\n      aria-label={{if @hideLabel @togglerLabel}}\n      disabled={{@disabled}}\n      {{on \"click\" (fn @onClick @on)}}\n      data-test-state={{if @on \"on\" \"off\"}}\n    >\n      <div class=\"toggle-button-switch\"></div>\n    </button>\n  {{/if}}\n\n</div>");

class EmberSundriesToggleButtonComponent extends Component {
  get uid() {
    return this.args.togglerId || guidFor(this);
  }
}
setComponentTemplate(TEMPLATE, EmberSundriesToggleButtonComponent);

export { EmberSundriesToggleButtonComponent as default };
//# sourceMappingURL=toggle-button.js.map
