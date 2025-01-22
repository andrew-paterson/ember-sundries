import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  role=\"button\"\n  onclick={{fn (mut this.modalDialogs.activeModal) true}}\n  data-test-class={{@dataTestClassTrigger}}\n>\n  {{yield (hash Trigger=(component \"blank-template\"))}}\n</div>\n<EmberSundries::ModalDialogWrapper\n  @activeModal={{this.modalDialogs.activeModal}}\n  @title={{@title}}\n>\n  {{yield (hash Content=(component \"blank-template\"))}}\n</EmberSundries::ModalDialogWrapper>");

class ModalDialogWithTrigger extends Component {
  static {
    g(this.prototype, "modalDialogs", [inject]);
  }
  #modalDialogs = (i(this, "modalDialogs"), undefined);
}
setComponentTemplate(TEMPLATE, ModalDialogWithTrigger);

export { ModalDialogWithTrigger as default };
//# sourceMappingURL=modal-dialog-with-trigger.js.map
