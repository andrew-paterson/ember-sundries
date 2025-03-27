import Component from '@glimmer/component';
import './in-page-alert.css';

export default class InPageAlert extends Component {
  get textClass() {
    return `text-${this.args.type}`;
  }

  get fillClass() {
    return `fill-${this.args.type}`;
  }
}
