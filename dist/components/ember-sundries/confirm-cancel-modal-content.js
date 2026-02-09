import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if @message}}<div\n    class=\"alert-text body-text margin-bottom-xl\"\n    data-test-id=\"confirm-cancel-modal-message\"\n  >{{@message}}</div>{{/if}}\n{{yield}}\n<div class=\"option-buttons flex flex-justify-end\">\n  <button\n    class=\"cancel btn btn-outline-gray-medium margin-right-lg\"\n    data-test-class=\"modal-cancel-button\"\n    onclick={{@closeModal}}\n  >Cancel</button>\n  <button\n    class=\"confirm btn btn-{{@colorScheme}}\"\n    {{on \"click\" (fn @confirmAction @modalName)}}\n    data-test-class=\"modal-confirm-button\"\n  >Confirm</button>\n</div>");

var confirmCancelModalContent = setComponentTemplate(TEMPLATE, templateOnly());

export { confirmCancelModalContent as default };
//# sourceMappingURL=confirm-cancel-modal-content.js.map
