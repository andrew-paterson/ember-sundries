import Component from '@glimmer/component';
import { action } from '@ember/object';
import Cropper from 'cropperjs';
import { tracked } from '@glimmer/tracking';
import 'cropperjs/dist/cropper.css';
import './image-cropper-with-file-select.css';

async function getImageBlob(imageUrl) {
  const response = await fetch(imageUrl);
  return response.blob();
}

export default class ProfileImageEditor extends Component {
  @tracked zoomRatio = 1;
  @tracked zoomLevel;
  @tracked src;

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
      max: 1,
    };
  }

  get showZoomSlider() {
    console.log('showZoomSlider');
    return this.sliderZoomParams.max > this.sliderZoomParams.min;
  }

  @action setZoomRatio(attempt = 1) {
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

  @action
  didInsert(el) {
    this.containerEl = el;
    const image = this.containerEl.querySelector(
      '[data-cropper-image-element]',
    );
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
      },
    });
    this.setZoomRatio();
  }

  @action
  async saveChanges() {
    const image = this.containerEl.querySelector(
      '[data-cropper-image-element]',
    );
    const src = image.getAttribute('src');
    const blob = await getImageBlob(src);
    const final = {};
    (this.args.outputWidths || '200').split(',').forEach((width) => {
      final[`width${width}px`] = this.cropper
        .getCroppedCanvas({ maxWidth: width, fillColor: '#fff' })
        .toDataURL(blob.type);
    });
    this.args.saveAction(final);
  }

  @action
  resetRotationAndFlip() {
    this.cropper.reset();
    if (this.args.saveActionOnEdit) {
      this.saveChanges();
    }
  }

  @action discardChanges() {
    this.setZoomRatio();
    this.cropper.replace(this.orginalSrc);
    if (this.args.saveActionOnEdit) {
      this.saveChanges();
    }
    if (this.args.discardChangesAction) {
      this.args.discardChangesAction(this.cropper);
    }
  }

  @action
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

  @action getZoomLevel() {
    return (
      Math.floor(
        (this.cropper.canvasData.width / this.cropper.canvasData.naturalWidth) *
          100,
      ) / 100
    );
  }

  @action
  clickZoom(direction) {
    const intervals = getRegularIntervals(
      this.sliderZoomParams.min,
      this.sliderZoomParams.max,
    );
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
        const closest = findClosestHigherNumber(
          intervals,
          this.zoomLevel || this.sliderZoomParams.min,
        );
        this.cropper.zoomTo(closest);
      }
    }
    this.zoomLevel = this.getZoomLevel();
    if (this.args.saveActionOnEdit) {
      this.saveChanges();
    }
  }

  @action
  sliderZoom(e) {
    this.cropper.zoomTo(e.target.value);
    this.zoomLevel = this.getZoomLevel();
    if (this.args.saveActionOnEdit) {
      this.saveChanges();
    }
  }

  @action
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

  @action
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
          this.args.invalidFiletypeSelectedAction(
            fileExtension,
            allowedFileTypes,
          );
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
