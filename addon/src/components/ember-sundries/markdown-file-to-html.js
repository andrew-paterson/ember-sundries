import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class MarkdownFileToHtml extends Component {
  dataTestComponent = 'markdown-content';

  @action
  didInsert() {
    fetch(this.filePath).then((response) => {
      response.text().then((result) => {
        this.markdown = result;
      });
    });
  }
}
