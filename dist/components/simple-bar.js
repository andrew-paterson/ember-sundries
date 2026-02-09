import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import SimpleBarCore from 'simplebar-core';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  data-simplebar=\"init\"\n  class=\"ember-simplebar\"\n  ...attributes\n  {{-private/ember-simplebar-init this.args onUpdate=this.setInstance}}\n>\n  <div class=\"simplebar-wrapper\">\n    <div class=\"simplebar-height-auto-observer-wrapper\">\n      <div class=\"simplebar-height-auto-observer\"></div>\n    </div>\n    <div class=\"simplebar-mask\">\n      <div class=\"simplebar-offset\">\n        <div\n          class=\"simplebar-content-wrapper\"\n          tabIndex=\"0\"\n          role=\"region\"\n          aria-label={{this.ariaLabel}}\n        >\n          <div class=\"simplebar-content\">\n            {{#if this.instance}}\n              {{yield this.instance}}\n            {{/if}}\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"simplebar-placeholder\"></div>\n  </div>\n  <div class=\"simplebar-track simplebar-horizontal\">\n    <div class=\"simplebar-scrollbar\"></div>\n  </div>\n  <div class=\"simplebar-track simplebar-vertical\">\n    <div class=\"simplebar-scrollbar\"></div>\n  </div>\n</div>");

class SimpleBarComponent extends Component {
  static {
    g(this.prototype, "instance", [tracked], function () {
      return undefined;
    });
  }
  #instance = (i(this, "instance"), undefined);
  get ariaLabel() {
    return this.args.ariaLabel || SimpleBarCore.defaultOptions.ariaLabel;
  }
  setInstance(instance) {
    this.instance = instance;
  }
  static {
    n(this.prototype, "setInstance", [action]);
  }
}
setComponentTemplate(TEMPLATE, SimpleBarComponent);

export { SimpleBarComponent as default };
//# sourceMappingURL=simple-bar.js.map
