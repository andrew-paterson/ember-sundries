import Component from '@glimmer/component';
import base64ImageDownload from '../../utils/base64-image-download.js';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"plot-container\"\n  data-test-class={{@dataTestClass}}\n  data-test-id={{@dataTestId}}\n  {{did-insert this.didInsert}}\n  ...attributes\n>\n  {{#if this.parsedChartData}}\n    <EmberChart\n      @type={{@type}}\n      @data={{this.parsedChartData.data}}\n      @options={{this.parsedChartData.options}}\n      @plugins={{@chartData.plugins}}\n    />\n  {{/if}}\n</div>\n{{#if this.animationComplete}}\n  <button\n    class=\"btn btn-outline-gray-medium\"\n    data-test-class=\"download-plot-as-png-button\"\n    type=\"button\"\n    {{on \"click\" this.download}}\n  ><SvgRepo::Icons::IconDownloadDoc />Download as PNG</button>\n{{/if}}");

class ChartData {
  constructor(args) {
    for (const key in args) {
      if (args[key] === undefined || args[key] === null) {
        continue;
      }
      this[key] = args[key];
    }
  }
}
class DownloadableChartjsPlot extends Component {
  static {
    g(this.prototype, "parsedChartData", [tracked]);
  }
  #parsedChartData = (i(this, "parsedChartData"), undefined);
  static {
    g(this.prototype, "animationComplete", [tracked]);
  }
  #animationComplete = (i(this, "animationComplete"), undefined);
  static {
    g(this.prototype, "chart", [tracked]);
  }
  #chart = (i(this, "chart"), undefined);
  didInsert() {
    var self = this;
    if (!this.args.chartData) {
      return;
    }
    var chartData = new ChartData(this.args.chartData);
    const animation = {
      onComplete(value) {
        self.animationComplete = true;
        self.chart = value.chart;
      }
    };
    chartData.options.animation = animation;
    const plugins = [{
      beforeDraw(chartInstance) {
        var ctx = chartInstance.chart.ctx;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
      }
    }];
    chartData.plugins = plugins;
    this.parsedChartData = chartData;
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  download() {
    base64ImageDownload(this.chart.toBase64Image(), this.args.pngFileName);
  }
  static {
    n(this.prototype, "download", [action]);
  }
}
setComponentTemplate(TEMPLATE, DownloadableChartjsPlot);

export { DownloadableChartjsPlot as default };
//# sourceMappingURL=downloadable-chartjs-plot.js.map
