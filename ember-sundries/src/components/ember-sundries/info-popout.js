import { action } from '@ember/object';
import Component from '@glimmer/component';
// import { later, cancel } from '@ember/runloop';
import './info-popout.css';

export default class InfoPopout extends Component {
  @action
  prevent() {
    return false;
  }

  @action
  open(dropdown) {
    dropdown.actions.open();

    // if (this.closeTimer) {
    //   cancel(this.closeTimer);
    //   this.closeTimer = null;
    // } else {
    //   dropdown.actions.open();
    // }
  }

  @action
  close(dropdown) {
    dropdown.actions.close();

    // this.closeTimer = later(() => {
    //   this.closeTimer = null;
    //   dropdown.actions.close();
    // }, 200);
  }
}
