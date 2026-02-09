import { action } from '@ember/object';
import Component from '@glimmer/component';
import '@ember/runloop';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<BasicDropdown\n  @verticalPosition={{or @verticalPosition \"auto\"}}\n  @horizontalPosition={{or @horizontalPosition \"auto\"}}\n  @renderInPlace={{@renderInPlace}}\n  @matchTriggerWidth={{@matchTriggerWidth}}\n  @triggerComponent={{@triggerComponent}}\n  @contentComponent={{@contentComponent}}\n  @calculatePosition={{@calculatePosition}}\n  @onOpen={{@onOpen}}\n  @onClose={{@onClose}}\n  @onFocus={{@onFocus}}\n  @calculateInPlacePosition={{@calculateInPlacePosition}}\n  @disabled={{@disabled}}\n  @calculatePosition={{@calculatePosition}}\n  as |dd|\n>\n  <dd.Trigger\n    class=\"{{@triggerClass}}\"\n    {{on \"mousedown\" this.prevent}}\n    {{on \"mouseenter\" (fn this.open dd)}}\n    {{on \"mouseleave\" (fn this.close dd)}}\n  >\n    {{yield to=\"triggerComponent\"}}\n  </dd.Trigger>\n\n  <dd.Content\n    class=\"{{@contentClass}}\"\n    {{on \"mouseenter\" (fn this.open dd)}}\n    {{on \"mouseleave\" (fn this.close dd)}}\n  >\n    {{yield to=\"contentComponent\"}}\n  </dd.Content>\n</BasicDropdown>");

class BasicDropdownHover extends Component {
  // delay = this.args.delay || 300;

  // get openDelay() {
  //   return this.delay;
  // }

  // get closeDela() {
  //   return this.delay;
  // }

  open(dropdown) {
    dropdown.actions.open();

    // if (this.closeTimer) {
    //   cancel(this.closeTimer);
    //   this.closeTimer = null;
    // } else {
    //   let openFn = () => {
    //     this.openTimer = null;
    //     dropdown.actions.open();
    //   };
    //   let openDelay = this.openDelay;
    //   if (openDelay) {
    //     this.openTimer = later(openFn, openDelay);
    //   } else {
    //     openFn();
    //   }
    // }
  }
  static {
    n(this.prototype, "open", [action]);
  }
  close(dropdown) {
    dropdown.actions.close();

    // if (this.openTimer) {
    //   cancel(this.openTimer);
    //   this.openTimer = null;
    // } else {
    //   let closeFn = () => {
    //     this.closeTimer = null;
    //     dropdown.actions.close();
    //   };
    //   let closeDelay = this.closeDelay;
    //   if (closeDelay) {
    //     this.closeTimer = later(closeFn, closeDelay);
    //   } else {
    //     closeFn();
    //   }
    // }
  }
  static {
    n(this.prototype, "close", [action]);
  }
  prevent(e) {
    return e.stopImmediatePropagation();
  }
  static {
    n(this.prototype, "prevent", [action]);
  }
}
setComponentTemplate(TEMPLATE, BasicDropdownHover);

export { BasicDropdownHover as default };
//# sourceMappingURL=basic-dropdown-hover.js.map
