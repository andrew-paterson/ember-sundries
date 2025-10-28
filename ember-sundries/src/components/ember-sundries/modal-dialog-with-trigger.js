import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ModalDialogWithTrigger extends Component {
  @service
  modalDialogs;
}
