import Component from '@glimmer/component';
import './loading-button.css';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<button\n  class=\"btn {{@buttonClass}}\"\n  {{on \"click\" @buttonAction}}\n  data-test-id={{@dataTestId}}\n><@beforeTextIcon />\n  {{@buttonText}}<SvgRepo::Icons::IconCog\n    class={{concat \"spinner button-right\" \" \" (if @loading \"on\")}}\n  /></button>");

class LoadingButton extends Component {}
setComponentTemplate(TEMPLATE, LoadingButton);

export { LoadingButton as default };
//# sourceMappingURL=loading-button.js.map
