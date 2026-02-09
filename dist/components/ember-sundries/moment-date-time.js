import Component from '@glimmer/component';
import './moment-date-time.css';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if @datetime}}\n  <span class=\"moment-date-time mdt-date\">\n    {{moment-format @datetime \"YYYY-MM-DD\"}}\n  </span>\n  <span class=\"moment-date-time mdt-time\">\n    {{moment-format @datetime \"HH:mm\"}}\n  </span>\n{{/if}}");

class MomentDateTime extends Component {}
setComponentTemplate(TEMPLATE, MomentDateTime);

export { MomentDateTime as default };
//# sourceMappingURL=moment-date-time.js.map
