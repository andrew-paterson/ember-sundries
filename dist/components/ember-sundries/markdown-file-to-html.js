import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div data-test-component={{this.dataTestComponent}}  {{did-insert this.didInsert}} ...attributes>\n  {{markdown-to-html markdown=this.markdown}}\n</div>");

class MarkdownFileToHtml extends Component {
  dataTestComponent = 'markdown-content';
  didInsert() {
    fetch(this.filePath).then(response => {
      response.text().then(result => {
        this.markdown = result;
      });
    });
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
}
setComponentTemplate(TEMPLATE, MarkdownFileToHtml);

export { MarkdownFileToHtml as default };
//# sourceMappingURL=markdown-file-to-html.js.map
