import Component from '@glimmer/component';
import { action } from '@ember/object';
import Cropper from 'cropperjs';
import { tracked } from '@glimmer/tracking';
import 'cropperjs/dist/cropper.css';
import './image-cropper-with-file-select.css';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"ember-sundries-image-cropper-with-file-select\"\n  data-test-id=\"ember-sundries-image-cropper-with-file-select\"\n  ...attributes\n>\n  {{#if this.src}}\n    <div class=\"image-cropper-container\" {{did-insert this.didInsert}}>\n      <img\n        data-cropper-image-element\n        alt=\"profile-image-preview\"\n        src={{this.src}}\n      />\n    </div>\n  {{else}}\n    <EmberSundries::FileSelect\n      @allowedFileTypesList=\"jpg,jpeg,png,gif,webp,x-icon,avif,bmp\"\n      @buttonText={{@selectImageButtonText}}\n      @multiple={{true}}\n      @fileProcessingAction={{this.loadImage}}\n      @buttonIconComponent={{@selectImageButtonIconComponent}}\n      class=\"no-image-selected\"\n      data-test-id=\"ember-sundries-image-cropper-with-file-select-select-image-button\"\n    />\n  {{/if}}\n  <div\n    class=\"ember-sundries-image-cropper-with-file-select-actions\n      {{@actionIconsContainerClass}}\"\n  >\n    {{#if @showResetRotateAndFlipButton}}\n      <button\n        type=\"button\"\n        class=\"btn-content\"\n        title=\"Reset\"\n        aria-label=\"Reset\"\n        {{on \"click\" this.resetRotationAndFlip}}\n        data-test-id=\"ember-sundries-image-cropper-with-file-select-reset-rotate-and-flip-button\"\n      ><SvgRepo::Icons::IconProcessing class=\"{{@actionIconClass}}\" /></button>\n    {{/if}}\n    <button\n      type=\"button\"\n      class=\"btn-content\"\n      title=\"Rotate 90° clockwise\"\n      aria-label=\"Rotate 90° clockwise\"\n      {{on \"click\" this.rotate90}}\n      data-test-id=\"ember-sundries-image-cropper-with-file-select-rotate-clockwise-button\"\n    ><SvgRepo::Icons::IconRotateRight class=\"{{@actionIconClass}}\" /></button>\n    <button\n      type=\"button\"\n      class=\"btn-content\"\n      title=\"Rotate 90° anticlockwise\"\n      aria-label=\"Rotate 90° anticlockwise\"\n      {{on \"click\" (fn this.rotate90 \"anticlockwise\")}}\n      data-test-id=\"ember-sundries-image-cropper-with-file-select-rotate-anti-clockwise-button\"\n    ><SvgRepo::Icons::IconRotateLeft class=\"{{@actionIconClass}}\" /></button>\n    <button\n      type=\"button\"\n      class=\"btn-content\"\n      title=\"Flip horizontally\"\n      aria-label=\"Flip horizontally\"\n      {{on \"click\" this.flip}}\n      data-test-id=\"ember-sundries-image-cropper-with-file-select-flip-horizontally-button\"\n    ><SvgRepo::Icons::IconFlipHorizontal\n        class=\"{{@actionIconClass}}\"\n      /></button>\n    <button\n      type=\"button\"\n      class=\"btn-content\"\n      title=\"Flip vertically\"\n      aria-label=\"Flip vertically\"\n      {{on \"click\" (fn this.flip \"vertical\")}}\n      data-test-id=\"ember-sundries-image-cropper-with-file-select-flip-vertically-button\"\n    ><SvgRepo::Icons::IconFlipVertical class=\"{{@actionIconClass}}\" /></button>\n  </div>\n  {{#if this.showZoomSlider}}\n    <div\n      class=\"ember-sundries-image-cropper-with-file-select-zoom-controls\n        {{@zoomControlsContainerClass}}\"\n    >\n      <button\n        type=\"button\"\n        class=\"btn-content\"\n        title=\"Zoom out\"\n        aria-label=\"Zoom out\"\n        {{on \"click\" (fn this.clickZoom \"out\")}}\n        data-test-id=\"ember-sundries-image-cropper-with-file-select-zoom-out-button\"\n      >\n        <SvgRepo::Icons::IconSearchMinus class=\"{{@zoomIconClass}}\" /></button>\n      <input\n        type=\"range\"\n        class=\"form-range\"\n        min=\"{{this.sliderZoomParams.min}}\"\n        max=\"{{this.sliderZoomParams.max}}\"\n        step=\"0.01\"\n        value=\"{{if this.zoomLevel this.zoomLevel this.sliderZoomParams.min}}\"\n        {{on \"change\" this.sliderZoom}}\n        title=\"Zoom slider\"\n        aria-label=\"Zoom slider\"\n        data-test-id=\"ember-sundries-image-cropper-with-file-select-zoom-slider\"\n      />\n      <button\n        type=\"button\"\n        class=\"btn-content\"\n        title=\"Zoom in\"\n        aria-label=\"Zoom in\"\n        {{on \"click\" this.clickZoom}}\n        data-test-id=\"ember-sundries-image-cropper-with-file-select-zoom-in-button\"\n      >\n        <SvgRepo::Icons::IconSearchPlus class=\"{{@zoomIconClass}}\" /></button>\n\n    </div>\n  {{/if}}\n  <div class=\"ember-sundries-image-cropper-with-file-select-main-buttons\">\n    <div class={{@buttonsRowClass}}>\n      {{!-- <EmberSundries::FileSelect\n        @allowedFileTypesList=\"jpg,jpeg,png,gif,webp,x-icon,avif,bmp\"\n        @buttonText={{@selectImageButtonText}}\n        @multiple={{true}}\n        @fileProcessingAction={{this.loadImage}}\n        @buttonIconComponent={{@selectImageButtonIconComponent}}\n        class={{@selectImageButtonClass}}\n        data-test-id=\"ember-sundries-image-cropper-with-file-select-select-image-button\"\n      /> --}}\n      {{!-- <button\n        type=\"button\"\n        class={{@clearProgressButtonClass}}\n        title={{@clearProgressButtonText}}\n        {{on \"click\" this.discardChanges}}\n        data-test-id=\"ember-sundries-image-cropper-with-file-select-clear-progress-button\"\n      >\n        {{@clearProgressButtonIconComponent}}\n        {{@clearProgressButtonText}}\n      </button> --}}\n      <button\n        type=\"button\"\n        class={{@cancelButtonClass}}\n        title={{@cancelButtonText}}\n        {{on \"click\" @closeAction}}\n        data-test-id=\"ember-sundries-image-cropper-with-file-select-cancel-button\"\n      >\n        {{@cancelButtonIconComponent}}\n        {{@cancelButtonText}}\n      </button>\n      {{#if @showAcceptEditsButton}}\n        <button\n          type=\"button\"\n          class={{@acceptEditsButtonClass}}\n          title={{@acceptEditsButtonText}}\n          {{on \"click\" this.saveChanges}}\n          data-test-id=\"ember-sundries-image-cropper-with-file-select-accept-edits-button\"\n        >\n          {{@acceptEditsButtonIconComponent}}\n          {{@acceptEditsButtonText}}\n        </button>\n      {{/if}}\n    </div>\n  </div>\n</div>");

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
  constructor() {
    super(...arguments);
    this.src = this.args.src;
    this.orginalSrc = this.args.src;
  }
  get sliderZoomParams() {
    if (!this.zoomRatio) {
      return null;
    }
    console.log(this.zoomRatio);
    return {
      min: Math.floor(this.zoomRatio * 100) / 100,
      max: 1
    };
  }
  get showZoomSlider() {
    console.log('showZoomSlider');
    return this.sliderZoomParams.max > this.sliderZoomParams.min;
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
    const image = this.containerEl.querySelector('[data-cropper-image-element]');
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
  async saveChanges() {
    const image = this.containerEl.querySelector('[data-cropper-image-element]');
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
    n(this.prototype, "saveChanges", [action]);
  }
  resetRotationAndFlip() {
    this.cropper.reset();
    if (this.args.saveActionOnEdit) {
      this.saveChanges();
    }
  }
  static {
    n(this.prototype, "resetRotationAndFlip", [action]);
  }
  discardChanges() {
    this.setZoomRatio();
    this.cropper.replace(this.orginalSrc);
    if (this.args.saveActionOnEdit) {
      this.saveChanges();
    }
    if (this.args.discardChangesAction) {
      this.args.discardChangesAction(this.cropper);
    }
  }
  static {
    n(this.prototype, "discardChanges", [action]);
  }
  rotate90(direction) {
    if (direction === 'anticlockwise') {
      this.cropper.rotate(-90);
    } else {
      this.cropper.rotate(90);
    }
    if (this.args.saveActionOnEdit) {
      this.saveChanges();
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
    if (this.args.saveActionOnEdit) {
      this.saveChanges();
    }
  }
  static {
    n(this.prototype, "clickZoom", [action]);
  }
  sliderZoom(e) {
    this.cropper.zoomTo(e.target.value);
    this.zoomLevel = this.getZoomLevel();
    if (this.args.saveActionOnEdit) {
      this.saveChanges();
    }
  }
  static {
    n(this.prototype, "sliderZoom", [action]);
  }
  flip(direction) {
    if (direction === 'vertical') {
      this.cropper.scaleX(-1 * (this.cropperData?.scaleX || 1));
    } else {
      this.cropper.scaleY(-1 * (this.cropperData?.scaleY || 1));
    }
    if (this.args.saveActionOnEdit) {
      this.saveChanges();
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
      if (_this.args.saveActionOnEdit) {
        _this.saveChanges();
      }
    };
    var reader;
    var file;
    if (files && files.length > 0) {
      file = files[0];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!allowedFileTypes.split(',').includes(fileExtension)) {
        if (this.args.invalidFiletypeSelectedAction) {
          this.args.invalidFiletypeSelectedAction(fileExtension, allowedFileTypes);
        }
        return;
      }
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
//# sourceMappingURL=image-cropper-with-file-select.js.map
