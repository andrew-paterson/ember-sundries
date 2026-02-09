import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<button\n  ...attributes\n  data-test-class=\"close-button\"\n  class={{concat \"ember-sundries-close-button \" @class}}\n  aria-label=\"{{@ariaLabel}}\"\n  type=\"button\"\n>\n  {{#if @innerContentComponent}}\n    <@innerContentComponent class={{@innerContentComponentClass}} />\n  {{else}}\n    x\n  {{/if}}\n</button>");

class CloseButton extends Component {}
setComponentTemplate(TEMPLATE, CloseButton);

export { CloseButton as default };
//# sourceMappingURL=close-button.js.map
