import Component from '@glimmer/component';
import { action } from '@ember/object';
import Cropper from 'cropperjs';
import { tracked } from '@glimmer/tracking';
import './profile-image-editor.css';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div class=\"image-cropper-container\" {{did-insert this.didInsert}}>\n  <img id=\"image\" src={{this.src}} />\n</div>\n<div class=\"flex\">\n  <button\n    type=\"button\"\n    class=\"btn-content\"\n    title=\"Reset\"\n    {{on \"click\" this.reset}}\n  ><SvgRepo::Icons::IconProcessing class=\"height-xl\" /></button>\n  <button\n    type=\"button\"\n    class=\"btn-content\"\n    title=\"Rotate 90° clockwise\"\n    {{on \"click\" this.rotate90}}\n  ><SvgRepo::Icons::IconRotateRight class=\"height-xl\" /></button>\n  <button\n    type=\"button\"\n    class=\"btn-content\"\n    title=\"Rotate 90° anticlockwise\"\n    {{on \"click\" (fn this.rotate90 \"anticlockwise\")}}\n  ><SvgRepo::Icons::IconRotateLeft class=\"height-xl\" /></button>\n  <button\n    type=\"button\"\n    class=\"btn-content\"\n    title=\"Flip horizontally\"\n    {{on \"click\" this.flip}}\n  ><SvgRepo::Icons::IconFlipHorizontal class=\"height-xl\" /></button>\n  <button\n    type=\"button\"\n    class=\"btn-content\"\n    title=\"Flip vertically\"\n    {{on \"click\" (fn this.flip \"vertical\")}}\n  ><SvgRepo::Icons::IconFlipVertical class=\"height-xl\" /></button>\n</div>\n{{#if (gt this.sliderZoomParams.max this.sliderZoomParams.min)}}\n  <div class=\"flex\">\n    <button\n      type=\"button\"\n      class=\"btn-content\"\n      title=\"Flip vertically\"\n      {{on \"click\" (fn this.clickZoom \"out\")}}\n    >\n      <SvgRepo::Icons::IconSearchMinus class=\"height-xl\" /></button>\n    <input\n      aria-label=\"Zoom slider\"\n      type=\"range\"\n      class=\"form-range\"\n      min=\"{{this.sliderZoomParams.min}}\"\n      max=\"{{this.sliderZoomParams.max}}\"\n      step=\"0.01\"\n      value=\"{{or this.zoomLevel this.sliderZoomParams.min}}\"\n      {{on \"change\" this.sliderZoom}}\n      title=\"Zoom\"\n    />\n    <button\n      type=\"button\"\n      class=\"btn-content\"\n      title=\"Flip vertically\"\n      {{on \"click\" this.clickZoom}}\n    >\n      <SvgRepo::Icons::IconSearchPlus class=\"height-xl\" /></button>\n\n  </div>\n{{/if}}\n<div class=\"flex\">\n  <button\n    type=\"button\"\n    class=\"btn btn-success\"\n    title=\"Accept changes\"\n    {{on \"click\" this.getCroppedCanvas}}\n  ><SvgRepo::Icons::IconTick />Accept edits</button>\n  <EmberSundries::FileSelect\n    {{!-- @buttonIconComponent={{this.iconImageComponent}} --}}\n    @allowedMimeTypesList=\"image/jpeg,image/png,image/gif,image/webp,image/x-icon,image/avif,image/bmp\"\n    @buttonText=\"Change image\"\n    @multiple={{false}}\n    @fileProcessingAction={{this.loadImage}}\n    class=\"btn btn-primary margin-bottom-lg\"\n  />\n</div>");

async function getImageBlob(imageUrl) {
  const response = await fetch(imageUrl);
  return response.blob();
}
class ProfileImageEditor extends Component {
  static {
    g(this.prototype, "zoomRatio", [tracked], function () {
      return 1;
    });
  }
  #zoomRatio = (i(this, "zoomRatio"), undefined);
  static {
    g(this.prototype, "zoomLevel", [tracked]);
  }
  #zoomLevel = (i(this, "zoomLevel"), undefined);
  static {
    g(this.prototype, "src", [tracked]);
  }
  #src = (i(this, "src"), undefined);
  // iconImageComponent = ensureSafeComponent(IconImageComponent);

  constructor() {
    super(...arguments);
    this.src = this.args.src;
  }
  get sliderZoomParams() {
    if (!this.zoomRatio) {
      return null;
    }
    return {
      min: Math.floor(this.zoomRatio * 100) / 100,
      max: 1
    };
  }
  setZoomRatio(attempt = 1) {
    if (attempt > 200) {
      return;
    }
    attempt++;
    const canvasData = this.cropper.getCanvasData();
    if (!canvasData.naturalWidth) {
      setTimeout(() => {
        this.setZoomRatio(attempt);
      }, 300);
      return;
    }
    if (canvasData.naturalHeight > canvasData.naturalWidth) {
      const containerWidth = this.containerEl.offsetWidth;
      const naturalWidth = canvasData.naturalWidth;
      this.zoomRatio = containerWidth / naturalWidth;
    } else {
      const containerHeight = this.containerEl.offsetHeight;
      const naturalHeight = canvasData.naturalHeight;
      this.zoomRatio = containerHeight / naturalHeight;
    }
  }
  static {
    n(this.prototype, "setZoomRatio", [action]);
  }
  didInsert(el) {
    this.containerEl = el;
    const image = this.containerEl.querySelector('#image');
    const _this = this;
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 3,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      dragMode: 'move',
      zoomOnWheel: false,
      background: false,
      crop(event) {
        _this.cropperData = event.detail;
      }
    });
    this.setZoomRatio();
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  async getCroppedCanvas() {
    const image = this.containerEl.querySelector('#image');
    const src = image.getAttribute('src');
    const blob = await getImageBlob(src);
    const final = {};
    (this.args.outputWidths || '200').split(',').forEach(width => {
      final[`width${width}px`] = this.cropper.getCroppedCanvas({
        maxWidth: width,
        fillColor: '#fff'
      }).toDataURL(blob.type);
    });
    this.args.saveAction(final);
  }
  static {
    n(this.prototype, "getCroppedCanvas", [action]);
  }
  reset() {
    this.cropper.reset();
  }
  static {
    n(this.prototype, "reset", [action]);
  }
  rotate90(direction) {
    if (direction === 'anticlockwise') {
      this.cropper.rotate(-90);
    } else {
      this.cropper.rotate(90);
    }
  }
  static {
    n(this.prototype, "rotate90", [action]);
  }
  getZoomLevel() {
    return Math.floor(this.cropper.canvasData.width / this.cropper.canvasData.naturalWidth * 100) / 100;
  }
  static {
    n(this.prototype, "getZoomLevel", [action]);
  }
  clickZoom(direction) {
    const intervals = getRegularIntervals(this.sliderZoomParams.min, this.sliderZoomParams.max);
    if (direction === 'out') {
      if (this.zoomLevel + 0.1 * this.zoomLevel < this.sliderZoomParams.min) {
        this.cropper.zoomTo(this.sliderZoomParams.min);
      } else {
        const closest = findClosestLowerNumber(intervals, this.zoomLevel);
        this.cropper.zoomTo(closest);
      }
    } else {
      if (this.zoomLevel + 0.1 * this.zoomLevel > this.sliderZoomParams.max) {
        this.cropper.zoomTo(this.sliderZoomParams.max);
      } else {
        const closest = findClosestHigherNumber(intervals, this.zoomLevel || this.sliderZoomParams.min);
        this.cropper.zoomTo(closest);
      }
    }
    this.zoomLevel = this.getZoomLevel();
  }
  static {
    n(this.prototype, "clickZoom", [action]);
  }
  sliderZoom(e) {
    this.cropper.zoomTo(e.target.value);
  }
  static {
    n(this.prototype, "sliderZoom", [action]);
  }
  flip(direction) {
    if (direction === 'vertical') {
      this.cropper.scaleY(-1 * (this.cropperData?.scaleY || 1));
    } else {
      this.cropper.scaleX(-1 * (this.cropperData?.scaleX || 1));
    }
  }
  static {
    n(this.prototype, "flip", [action]);
  }
  async loadImage(files, allowedFileTypes) {
    const _this = this;
    var done = function (url) {
      _this.src = url;
      _this.cropper.replace(url);
      _this.setZoomRatio();
    };
    var reader;
    var file;
    if (files && files.length > 0) {
      file = files[0];
      if (URL) {
        done(URL.createObjectURL(file));
      } else if (FileReader) {
        reader = new FileReader();
        reader.onload = function () {
          done(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  static {
    n(this.prototype, "loadImage", [action]);
  }
}
function getRegularIntervals(x, y) {
  const intervals = [];
  const step = (y - x) / 10;
  for (let i = 0; i < 10; i++) {
    intervals.push(Math.floor((x + i * step) * 100) / 100);
  }
  return [...intervals, y];
}
function findClosestLowerNumber(numbers, x) {
  for (let i = numbers.length - 1; i >= 0; i--) {
    if (numbers[i] < x) {
      return numbers[i];
    }
  }
  return null; // Return null if no lower number is found
}
function findClosestHigherNumber(numbers, x) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > x) {
      return numbers[i];
    }
  }
  return null; // Return null if no higher number is found
}
setComponentTemplate(TEMPLATE, ProfileImageEditor);

export { ProfileImageEditor as default };
//# sourceMappingURL=profile-image-editor.js.map
