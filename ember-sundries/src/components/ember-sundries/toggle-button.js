import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import './toggle-button.css';

export default class EmberSundriesToggleButtonComponent extends Component {
  get uid() {
    return this.args.togglerId || guidFor(this);
  }
}
