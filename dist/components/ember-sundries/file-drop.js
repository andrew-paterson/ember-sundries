import { action } from '@ember/object';
import Component from '@glimmer/component';
import './file-drop.css';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  ondragleave={{this.onDragLeave}}\n  ondragover={{this.onDragOver}}\n  ondrop={{this.onDrop}}\n  data-test-class={{this.dataTestClass}}\n  class=\"draggable-dropzone {{this.dragClass}} {{if @disabled \'disabled\'}}\"\n  ...attributes\n>\n  <span class=\"{{@fileDropTextPromptClass}}\">{{@fileDropTextPrompt}}</span>\n</div>");

class FileDrop extends Component {
  dragClass = 'deactivated';
  dataTestClass = 'file-drop-zone';
  onDragLeave(event) {
    event.preventDefault();
    return this.dragClass = 'deactivated';
  }
  static {
    n(this.prototype, "onDragLeave", [action]);
  }
  onDragOver(event) {
    event.preventDefault();
    return this.dragClass = 'activated';
  }
  static {
    n(this.prototype, "onDragOver", [action]);
  }
  onDrop(event) {
    event.preventDefault();
    var files;
    this.dragClass = 'deactivated';
    files = event.dataTransfer.files;
    if (this.args.disabled) {
      if (this.args.fileDroppedWhenDisabledAction) {
        this.args.fileDroppedWhenDisabledAction();
      }
      return;
    }
    this.args.fileProcessingAction(files, this.args.allowedFileTypesList);
  }
  static {
    n(this.prototype, "onDrop", [action]);
  }
}
setComponentTemplate(TEMPLATE, FileDrop);

export { FileDrop as default };
//# sourceMappingURL=file-drop.js.map
