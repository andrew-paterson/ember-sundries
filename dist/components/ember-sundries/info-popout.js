import { action } from '@ember/object';
import Component from '@glimmer/component';
import './info-popout.css';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!-- {{#if @hover}} --}}\n<BasicDropdown @renderInPlace={{@renderInPlace}} as |dd|>\n  <dd.Trigger\n    class=\"info-popout-trigger\"\n    data-test-class=\"info-popout-trigger\"\n    {{on \"mousedown\" (if @hover this.prevent)}}\n    {{on \"mouseenter\" (if @hover (fn this.open dd))}}\n    {{on \"mouseleave\" (if @hover (fn this.close dd))}}\n  >\n    {{#if @triggerComponent}}\n      <@triggerComponent\n        class={{concat @triggerClass (if dd.isOpen \" active\")}}\n      />\n    {{else if @triggerText}}\n      <div class={{concat @triggerClass (if dd.isOpen \" active\")}}>\n        {{@triggerText}}\n      </div>\n    {{else}}\n      <button\n        class=\"btn-content {{@triggerClass}} {{if dd.isOpen \'active\'}}\"\n        data-test-class=\"trigger\"\n      >\n        <SvgRepo::Icons::IconInfo />\n      </button>\n    {{/if}}\n\n  </dd.Trigger>\n  <dd.Content\n    class=\"info-popout-content {{if @positionStatic \'position-static\'}}\"\n    data-test-class=\"info-popout-content\"\n    {{on \"mouseenter\" (if @hover (fn this.open dd))}}\n    {{on \"mouseleave\" (if @hover (fn this.close dd))}}\n  >\n    <div\n      class=\"{{@popoutBoxClass}} pop-up-box box-arrow body-text border\"\n      style={{@popoutBoxStyle}}\n    >\n      {{yield}}\n    </div>\n  </dd.Content>\n</BasicDropdown>\n{{!-- {{else}}\n  <BasicDropdown @renderInPlace={{@renderInPlace}} as |Dropdown|>\n    <Dropdown.Trigger\n      class=\"info-popout-trigger\"\n      data-test-class=\"info-popout-trigger\"\n    >\n      {{#if @triggerComponent}}\n        {{#let (component @triggerComponent) as |TriggerComponent|}}\n          <TriggerComponent\n            class={{concat @triggerClass (if Dropdown.isOpen \" active\")}}\n          />\n        {{/let}}\n      {{else}}\n        <button\n          class=\"btn-content {{@triggerClass}} {{if Dropdown.isOpen \'active\'}}\"\n          data-test-class=\"trigger\"\n        >\n          <SvgRepo::Icons::IconInfo />\n        </button>\n      {{/if}}\n    </Dropdown.Trigger>\n    <Dropdown.Content\n      class=\"info-popout-content {{if @positionStatic \'position-static\'}}\"\n      data-test-class=\"info-popout-content\"\n    >\n      <div\n        class=\"{{@popoutBoxClass}} pop-up-box box-arrow body-text border\"\n        style={{@popoutBoxStyle}}\n      >\n        {{yield}}\n      </div>\n    </Dropdown.Content>\n  </BasicDropdown>\n{{/if}} --}}");

class InfoPopout extends Component {
  prevent() {
    return false;
  }
  static {
    n(this.prototype, "prevent", [action]);
  }
  open(dropdown) {
    dropdown.actions.open();

    // if (this.closeTimer) {
    //   cancel(this.closeTimer);
    //   this.closeTimer = null;
    // } else {
    //   dropdown.actions.open();
    // }
  }
  static {
    n(this.prototype, "open", [action]);
  }
  close(dropdown) {
    dropdown.actions.close();

    // this.closeTimer = later(() => {
    //   this.closeTimer = null;
    //   dropdown.actions.close();
    // }, 200);
  }
  static {
    n(this.prototype, "close", [action]);
  }
}
setComponentTemplate(TEMPLATE, InfoPopout);

export { InfoPopout as default };
//# sourceMappingURL=info-popout.js.map
