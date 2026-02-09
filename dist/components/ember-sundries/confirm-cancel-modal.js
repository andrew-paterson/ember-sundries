import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<EmberSundries::ModalDialogWrapper\n  @activeModal={{@activeModal}}\n  @title={{@title}}\n>\n  <EmberSundries::ConfirmCancelModalContent\n    @message={{@message}}\n    @closeModal={{@closeModal}}\n    @colorScheme={{@colorScheme}}\n    @confirmAction={{@confirmAction}}\n    @modalName={{@modalName}}\n  />\n</EmberSundries::ModalDialogWrapper>");

class ConfirmCancelModal extends Component {}
setComponentTemplate(TEMPLATE, ConfirmCancelModal);

export { ConfirmCancelModal as default };
//# sourceMappingURL=confirm-cancel-modal.js.map
