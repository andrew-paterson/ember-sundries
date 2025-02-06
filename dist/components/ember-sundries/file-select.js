import { action } from '@ember/object';
import Component from '@glimmer/component';
import './file-select.css';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  data-test-class={{this.dataTestClass}}\n  class=\"input-file-wrapper {{if this.disabled \'disabled\'}}\"\n  ...attributes\n>\n  {{#if @buttonIconComponent}}\n    <@buttonIconComponent />\n  {{/if}}\n  {{@buttonText}}\n  <form class=\"file-select-button\">\n    <EmberSundries::InputTypeFile\n      @sendFiles={{this.sendFiles}}\n      @multiple={{@multiple}}\n      @disabled={{@disabled}}\n      @accept={{@allowedMimeTypesList}}\n    />\n  </form>\n</div>");

class FileSelect extends Component {
  type = 'div';
  dataTestClass = 'file-select-button';
  sendFiles(files) {
    this.args.fileProcessingAction(files, this.args.allowedFileTypesList);
  }
  static {
    n(this.prototype, "sendFiles", [action]);
  }
}
setComponentTemplate(TEMPLATE, FileSelect);

export { FileSelect as default };
//# sourceMappingURL=file-select.js.map
