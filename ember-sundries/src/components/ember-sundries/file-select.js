import { action } from '@ember/object';
import Component from '@glimmer/component';
import './file-select.css';

export default class FileSelect extends Component {
  @action
  sendFiles(files) {
    this.args.fileProcessingAction(files, this.args.allowedFileTypesList);
  }
}
