import Component from '@glimmer/component';
import { action } from '@ember/object';
import Cropper from 'cropperjs';
import { tracked } from '@glimmer/tracking';

async function getImageBlob(imageUrl) {
  const response = await fetch(imageUrl);
  return response.blob();
}

export default class ProfileImageEditor extends Component {
  @tracked zoomRatio = 1;
  @tracked src;

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
      max: 1,
    };
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
      },
    });
    this.setZoomRatio();
  }

  @action
  async getCroppedCanvas() {
    const image = this.containerEl.querySelector('#image');
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
  reset() {
    this.cropper.reset();
  }

  @action
  rotate90(direction) {
    if (direction === 'anticlockwise') {
      this.cropper.rotate(-90);
    } else {
      this.cropper.rotate(90);
    }
  }

  @action
  zoom(direction) {
    if (direction === 'out') {
      this.cropper.zoom(-0.1);
    } else {
      this.cropper.zoom(0.1);
    }
  }

  @action
  sliderZoom(e) {
    this.cropper.zoomTo(e.target.value);
  }

  @action
  flip(direction) {
    if (direction === 'vertical') {
      this.cropper.scaleY(-1 * (this.cropperData?.scaleY || 1));
    } else {
      this.cropper.scaleX(-1 * (this.cropperData?.scaleX || 1));
    }
  }

  @action
  async loadImage(files, allowedFileTypes) {
    console.log(allowedFileTypes);
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
}
