import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import Component from '@glimmer/component';

export default class InputTypeFile extends Component {
  @action
  wasChanged(e) {
    var input = e.target;
    if (!isEmpty(input.files)) {
      this.args.sendFiles(input.files);
      e.target.closest('.file-select-button').reset();
    }
  }
}
