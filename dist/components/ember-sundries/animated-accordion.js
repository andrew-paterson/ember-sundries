import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import './animated-accordion.css';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"accordion-item\n    {{this.emberSundries.accordionItemDefaultClasses}}\n    {{this.openDefaultClasses}}\n    {{this.closedDefaultClasses}}\n    {{if this.open \'open\'}}\"\n  data-test-type=\"accordion-item\"\n  {{did-insert this.didInsert}}\n  ...attributes\n>\n  <div\n    class={{concat\n      \"accordion-item-header\"\n      \" \"\n      @accordionHeaderClass\n      \" \"\n      this.emberSundries.accordionItemHeaderDefaultClasses\n    }}\n    {{on \"click\" this.toggle}}\n    data-test-class=\"accordion-header\"\n  >\n    {{#if (has-block \"accordionHeaderContent\")}}\n      {{yield to=\"accordionHeaderContent\"}}\n    {{else}}\n      {{this.parsedTitle}}\n    {{/if}}\n    {{#if this.open}}\n      <EmberSundries::Svg::ArrowUp class=\"accordion-expand-collapse-icon\" />\n    {{else}}\n      <EmberSundries::Svg::ArrowDown class=\"accordion-expand-collapse-icon\" />\n    {{/if}}\n  </div>\n  {{#if (or @toggleWithCss this.open)}}\n    <div class=\"accordion-item-content\" data-test-class=\"accordion-content\">\n      <div class=\"accordion-item-content-inner\">\n        {{yield}}\n      </div>\n    </div>\n  {{/if}}\n</div>");

class AnimatedAccordion extends Component {
  static {
    g(this.prototype, "emberSundries", [inject]);
  }
  #emberSundries = (i(this, "emberSundries"), undefined);
  static {
    g(this.prototype, "headerLevel", [tracked]);
  }
  #headerLevel = (i(this, "headerLevel"), undefined);
  static {
    g(this.prototype, "title", [tracked]);
  }
  #title = (i(this, "title"), undefined);
  static {
    g(this.prototype, "open", [tracked]);
  }
  #open = (i(this, "open"), undefined);
  get parsedTitle() {
    var headerLevel = this.args.headerLevel || 2;
    return htmlSafe(`<h${headerLevel} class="margin-0">${this.args.title}</h${headerLevel}>`);
  }

  // get expandCollapseIcon() {
  //   return this.open
  //     ? ensureSafeComponent(IconArrowUpComponent)
  //     : ensureSafeComponent(IconArrowDownComponent);
  // }

  get openDefaultClasses() {
    if (!this.open) {
      return;
    }
    return this.emberSundries.accordionItemOpenDefaultClasses;
  }
  get closedDefaultClasses() {
    if (this.open) {
      return;
    }
    return this.emberSundries.accordionItemClosedDefaultClasses;
  }
  toggle() {
    this.open = !this.open;
  }
  static {
    n(this.prototype, "toggle", [action]);
  }
  close() {
    this.open = false;
  }
  static {
    n(this.prototype, "close", [action]);
  }
  didInsert() {
    this.open = this.args.startOpen || false;
    if (this.args.afterInsertAccordion) {
      this.args.afterInsertAccordion(this);
    }
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
}
setComponentTemplate(TEMPLATE, AnimatedAccordion);

export { AnimatedAccordion as default };
//# sourceMappingURL=animated-accordion.js.map
