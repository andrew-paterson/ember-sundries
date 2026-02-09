import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import './select-all-checkbox.css';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"select-all-checkbox\n    {{this.collectionState}}\n    {{if this.disabled \'disabled\'}}\"\n  data-test-class=\"select-all-checkbox\"\n  ...attributes\n>\n  {{#if @relatedCollection}}\n    <EmberSundries::LabelledCheckbox\n      @changedAction={{this.selectAllClicked}}\n      @value={{readonly (not-eq this.collectionState \"none-selected\")}}\n      @label={{@label}}\n    />\n  {{/if}}\n</div>");

class SelectAllCheckbox extends Component {
  static {
    g(this.prototype, "relatedCollection", [tracked]);
  }
  #relatedCollection = (i(this, "relatedCollection"), undefined);
  static {
    g(this.prototype, "selectAllText", [tracked]);
  }
  #selectAllText = (i(this, "selectAllText"), undefined);
  static {
    g(this.prototype, "selectNoneText", [tracked]);
  }
  #selectNoneText = (i(this, "selectNoneText"), undefined);
  static {
    g(this.prototype, "showLabel", [tracked]);
  }
  #showLabel = (i(this, "showLabel"), undefined);
  get collectionState() {
    if (!this.args.relatedCollection) {
      return;
    }
    if (!this.args.relatedCollection.isEvery('selected', true) && this.args.relatedCollection.isAny('selected', true)) {
      return 'some-selected';
    } else if (this.args.relatedCollection.isEvery('selected', true)) {
      return 'all-selected';
    } else if (!this.args.relatedCollection.isAny('selected', true)) {
      return 'none-selected';
    }
  }
  get label() {
    if (this.args.showLabel) {
      return this.collectionState === 'all-selected' ? this.args.selectNoneText || 'Select none' : this.args.selectAllText || 'Select all';
    }
  }
  selectAllClicked(value, event) {
    if (!this.args.allowPropagation) {
      event.stopPropagation();
    }
    var selectAllValue = this.collectionState === 'all-selected' ? false : true;
    this.args.relatedCollection.forEach(item => {
      item.selected = selectAllValue;
    });
    if (this.args.afterSelectAllClicked) {
      this.args.afterSelectAllClicked(value, event, this.collectionState);
    }
  }
  static {
    n(this.prototype, "selectAllClicked", [action]);
  }
}
setComponentTemplate(TEMPLATE, SelectAllCheckbox);

export { SelectAllCheckbox as default };
//# sourceMappingURL=select-all-checkbox.js.map
