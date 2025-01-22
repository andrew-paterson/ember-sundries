import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import './in-page-alert.css';
export default class InPageAlert extends Component {
  dataTestClass = 'in-page-alert';

  @tracked type;

  get textClass() {
    return `text-${this.args.type}`;
  }

  get fillClass() {
    return `fill-${this.args.type}`;
  }
}
