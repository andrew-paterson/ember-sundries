import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import './confirm-cancel-popout.css';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  data-test-class={{this.dataTestClass}}\n  data-test-name={{this.dataTestName}}\n  class=\"confirm-cancel-container {{@containerClasses}} {{@colorScheme}} \"\n  data-test-id={{@dataTestId}}\n  {{did-insert this.didInsert}}\n  ...attributes\n>\n  <BasicDropdown\n    @renderInPlace={{this.renderInPlace}}\n    @onOpen={{@onOpen}}\n    @onClose={{@onClose}}\n    @horizontalPosition={{@align}}\n    as |Dropdown|\n  >\n    <Dropdown.Trigger>\n      <button\n        type=\"button\"\n        class=\"btn btn-{{@colorScheme}}\n          {{if Dropdown.isOpen \'active\'}}\n          {{if @requestInFlight \'request-in-flight\'}}\n          {{@mainButtonClasses}}\"\n        data-test-class=\"trigger\"\n      ><@mainButtonIcon />{{@mainButtonText}}\n        <SvgRepo::Icons::IconCog\n          class={{concat (if @requestInFlight \"on\") \" spinner button-right\"}}\n        />\n      </button>\n    </Dropdown.Trigger>\n    <Dropdown.Content\n      class=\"{{if @positionStatic \'position-static\'}} align-{{@align}}\"\n    >\n      <div\n        class=\"{{@popoutBoxClasses}}\n          {{\'pop-up-box box-arrow body-text confirm-cancel-content\'}}\n          border-{{@colorScheme}}\"\n        data-test-id=\"{{@dataTestId}}-confirm-cancel-content\"\n      >\n        {{#if @message}}<p class=\"alert-text\">{{@message}}</p>{{/if}}\n        {{yield}}\n        <div class=\"option-buttons\">\n          <button\n            class=\"confirm btn btn-{{@colorScheme}}\"\n            {{on \"click\" (fn this.confirm Dropdown)}}\n            data-test-class=\"confirm-button\"\n          >Confirm</button>\n          <button\n            class=\"cancel btn btn-outline-gray-medium\"\n            {{on \"click\" (fn this.closePopoutBox Dropdown)}}\n            data-test-class=\"cancel\"\n          >Cancel</button>\n        </div>\n      </div>\n    </Dropdown.Content>\n  </BasicDropdown>\n</div>");

class ConfirmCancelPopout extends Component {
  dataTestClass = 'confirm-cancel-dialogue';
  static {
    g(this.prototype, "mainButtonText", [tracked]);
  }
  #mainButtonText = (i(this, "mainButtonText"), undefined);
  get dataTestName() {
    return (this.args.mainButtonText || '').replace(/\s+/g, '-').toLowerCase();
  }
  didInsert() {
    if (this.args.positionStatic) {
      this.args.renderInPlace = true;
    }
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  closePopoutBox(dropdown) {
    dropdown.actions.close();
  }
  static {
    n(this.prototype, "closePopoutBox", [action]);
  }
  confirm(dropdown) {
    if (this.args.confirmAction() === 'confirmActionFail') {
      return;
    }
    this.closePopoutBox(dropdown); // this.send
  }
  static {
    n(this.prototype, "confirm", [action]);
  }
}
setComponentTemplate(TEMPLATE, ConfirmCancelPopout);

export { ConfirmCancelPopout as default };
//# sourceMappingURL=confirm-cancel-popout.js.map
