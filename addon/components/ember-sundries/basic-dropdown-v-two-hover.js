import { action } from '@ember/object';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../../templates/components/ember-sundries/basic-dropdown-v-two-hover';
import { cancel, later } from '@ember/runloop';

@templateLayout(layout)
@tagName('')
export default class BasicDropdownVTwoHover extends Component {
  delay = 300;

  @oneWay('delay')
  openDelay;

  @oneWay('delay')
  closeDelay;

  @action
  open(dropdown) {
    if (this.closeTimer) {
      cancel(this.closeTimer);
      this.closeTimer = null;
    } else {
      let openFn = () => {
        this.openTimer = null;
        dropdown.actions.open();
      };
      let openDelay = this.openDelay;
      if (openDelay) {
        this.openTimer = later(openFn, openDelay);
      } else {
        openFn();
      }
    }
  }

  @action
  close(dropdown) {
    if (this.openTimer) {
      cancel(this.openTimer);
      this.openTimer = null;
    } else {
      let closeFn = () => {
        this.closeTimer = null;
        dropdown.actions.close();
      };
      let closeDelay = this.closeDelay;
      if (closeDelay) {
        this.closeTimer = later(closeFn, closeDelay);
      } else {
        closeFn();
      }
    }
  }

  @action
  prevent() {
    return false;
  }
}
