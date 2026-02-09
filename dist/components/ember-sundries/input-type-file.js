import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<input\n  type=\"file\"\n  disabled={{@disabled}}\n  multiple={{@multiple}}\n  {{on \"change\" this.wasChanged}}\n  accept={{@accept}}\n/>");

class InputTypeFile extends Component {
  wasChanged(e) {
    var input = e.target;
    if (!isEmpty(input.files)) {
      this.args.sendFiles(input.files);
      e.target.closest('.file-select-button').reset();
    }
  }
  static {
    n(this.prototype, "wasChanged", [action]);
  }
}
setComponentTemplate(TEMPLATE, InputTypeFile);

export { InputTypeFile as default };
//# sourceMappingURL=input-type-file.js.map
