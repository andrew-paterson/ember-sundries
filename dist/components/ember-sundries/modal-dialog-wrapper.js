import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if @activeModal}}\n  <ModalDialog\n    @onClose={{fn (mut @activeModal) false}}\n    @translucentOverlay=\"true\"\n    data-test-class=\"modal-dialog\"\n  ><div\n      class=\"flex flex-justify-space-between flex-align-center margin-bottom-lg\"\n    >\n      {{#if @title}}<h3\n          class=\"margin-0\"\n          data-test-id=\"modal-dialog-title\"\n        >{{@title}}</h3>\n      {{else if @titleComponent}}\n        {{#let (component @titleComponent.path) as |TitleComponent|}}\n          <TitleComponent @props={{@titleComponent.props}} />\n        {{/let}}\n      {{/if}}\n\n      <button\n        onclick={{fn (mut @activeModal) false}}\n        class=\"btn-content\"\n      ><SvgRepo::Icons::IconCross\n          class=\"fill-gray-medium width-lg\"\n          data-test-id=\"modal-dialog-close-button\"\n        /></button></div>\n    {{yield}}\n  </ModalDialog>\n{{/if}}");

class ModalDialogWrapper extends Component {}
setComponentTemplate(TEMPLATE, ModalDialogWrapper);

export { ModalDialogWrapper as default };
//# sourceMappingURL=modal-dialog-wrapper.js.map
