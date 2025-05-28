import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  find,
  fillIn,
  render,
  waitUntil,
  waitFor,
  triggerEvent,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import catPortraits from './cat-portraits';
import rotateAndFlipOutputs from './rotate-and-flip-outputs';
import resetRotateAndFlipOutputs from './reset-rotate-and-flip-outputs';
import changeImageOutputs from './change-image-outputs';

module('Integration | Component | profile-image-editor', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach((...args) => {
    const assertionsInDom = Array.from(
      document.querySelectorAll('ol.qunit-assert-list span.test-message'),
    ).filter((item) => item.textContent.includes('[DATA-URI]'));
    assertionsInDom.forEach((el) => {
      const dataUri = el.textContent.split('[DATA-URI]')[1].trim();
      const img = new Image();
      const div = document.createElement('div');
      img.src = dataUri;
      div.appendChild(img);
      el.after(div);
      el.textContent = el.textContent.split('[DATA-URI]')[0].trim();
    });
    drawDataUris();
  });

  test('Rotate, flip, and zoom', async function (assert) {
    counter = 0;
    this.saveAction = (output) => {
      this.latestOutput = output;
      return;
    };
    this.catPortraits = catPortraits;
    await render(
      hbs`<EmberSundries::ProfileImageEditor
      @outputWidths="50,80"
      @saveAction={{this.saveAction}}
      @closeAction={{this.closeAction}}
      @discardChangesAction={{this.discardChanges}}
      @src={{this.catPortraits.one}}
      @closeButtonAriaLabel="Close profile image editor"
      @selectImageButtonText="Select image"
      @acceptEditsButtonText="Accept changes"
      @clearProgressButtonText="Discard changes"
      @closeButtonClass="btn-content"
      @closeButtonInnerContentComponent={{this.closeButtonContent}}
      @closeButtonInnerContentComponentClass="width-lg fill-gray-medium"
      @actionIconClass="height-xl fill-gray-medium stroke-gray-medium"
      @zoomIconClass="height-mxl fill-gray-medium"
      @actionIconsContainerClass="margin-top-lg"
      @zoomControlsContainerClass="margin-bottom-lg"
      @selectImageButtonIconComponent={{this.fileImageIconComponent}}
      @clearProgressButtonIconComponent={{this.clearProgressButtonIconComponent}}
      @acceptEditsButtonIconComponent={{this.acceptEditsButtonIconComponent}}
      @selectImageButtonClass="btn btn-outline-primary margin-bottom-md"
      @clearProgressButtonClass="btn btn-outline-gray-medium margin-bottom-md"
      @acceptEditsButtonClass="btn btn-success"
      @saveActionOnEdit={{true}}
      @showAcceptEditsButton={{true}}
      @showResetRotateAndFlipButton={{true}}
    />`,
    );
    await processBreakdown(
      rotateFlipAndZoomBreakdown,
      rotateAndFlipOutputs,
      assert,
      this,
    );
  });

  test('Reset rotate, flip, and zoom', async function (assert) {
    counter = 0;
    this.saveAction = (output) => {
      this.latestOutput = output;
      generateOutputs(output, resetRotateFlipAndZoomBreakdown);
      return;
    };
    this.catPortraits = catPortraits;
    await render(
      hbs`<EmberSundries::ProfileImageEditor
      @outputWidths="50,80"
      @saveAction={{this.saveAction}}
      @closeAction={{this.closeAction}}
      @discardChangesAction={{this.discardChanges}}
      @src={{this.catPortraits.one}}
      @closeButtonAriaLabel="Close profile image editor"
      @selectImageButtonText="Select image"
      @acceptEditsButtonText="Accept changes"
      @clearProgressButtonText="Discard changes"
      @closeButtonClass="btn-content"
      @closeButtonInnerContentComponent={{this.closeButtonContent}}
      @closeButtonInnerContentComponentClass="width-lg fill-gray-medium"
      @actionIconClass="height-xl fill-gray-medium stroke-gray-medium"
      @zoomIconClass="height-mxl fill-gray-medium"
      @actionIconsContainerClass="margin-top-lg"
      @zoomControlsContainerClass="margin-bottom-lg"
      @selectImageButtonIconComponent={{this.fileImageIconComponent}}
      @clearProgressButtonIconComponent={{this.clearProgressButtonIconComponent}}
      @acceptEditsButtonIconComponent={{this.acceptEditsButtonIconComponent}}
      @selectImageButtonClass="btn btn-outline-primary margin-bottom-md"
      @clearProgressButtonClass="btn btn-outline-gray-medium margin-bottom-md"
      @acceptEditsButtonClass="btn btn-success"
      @saveActionOnEdit={{true}}
      @showAcceptEditsButton={{true}}
      @showResetRotateAndFlipButton={{true}}
    />`,
    );
    await processBreakdown(
      resetRotateFlipAndZoomBreakdown,
      resetRotateAndFlipOutputs,
      assert,
      this,
    );
  });

  test('Change image', async function (assert) {
    this.catPortraits = catPortraits;
    const textFile = new Blob(['cat'], { type: 'text/plain' });
    textFile.name = 'cat.txt';
    const imageFile = dataUriToBlob(this.catPortraits.two);
    imageFile.name = 'cat.jpg';
    const changeImageBreakdown = [
      {
        selector:
          '[data-test-id="ember-sundries-profile-image-editor-accept-edits-button"]',
        checks: ['initialImage'],
      },
      {
        selector:
          '[data-test-id="ember-sundries-profile-image-editor-select-image-button"] input',
        method: triggerEvent,
        arguments: ['change', { files: [imageFile] }],
        checks: ['validImageSelected'],
      },
      {
        selector:
          '[data-test-id="ember-sundries-profile-image-editor-reset-rotate-and-flip-button"]',
        checks: ['resetRotateAndFlip1'],
      },
      {
        selector:
          '[data-test-id="ember-sundries-profile-image-editor-clear-progress-button"]',
        checks: ['clearProgress1'],
      },
    ];
    counter = 0;
    this.saveAction = (output) => {
      this.latestOutput = output;
      generateOutputs(output, changeImageBreakdown);
      return;
    };
    this.invalidFiletypeSelectedAction = (
      fileExtension,
      allowedFileExtensions,
    ) => {
      assert.equal(
        fileExtension,
        'txt',
        `The invalidFiletypeSelectedAction action is fired with the correct argument for fileExtension.`,
      );
      assert.equal(
        allowedFileExtensions,
        'jpg,jpeg,png,gif,webp,x-icon,avif,bmp',
        `The invalidFiletypeSelectedAction action is fired with the correct argument for allowedFileExtensions.`,
      );
    };
    await render(
      hbs`<EmberSundries::ProfileImageEditor
      @outputWidths="50,80"
      @saveAction={{this.saveAction}}
      @closeAction={{this.closeAction}}
      @discardChangesAction={{this.discardChanges}}
      @src={{this.catPortraits.one}}
      @closeButtonAriaLabel="Close profile image editor"
      @selectImageButtonText="Select image"
      @acceptEditsButtonText="Accept changes"
      @clearProgressButtonText="Discard changes"
      @closeButtonClass="btn-content"
      @closeButtonInnerContentComponent={{this.closeButtonContent}}
      @closeButtonInnerContentComponentClass="width-lg fill-gray-medium"
      @actionIconClass="height-xl fill-gray-medium stroke-gray-medium"
      @zoomIconClass="height-mxl fill-gray-medium"
      @actionIconsContainerClass="margin-top-lg"
      @zoomControlsContainerClass="margin-bottom-lg"
      @selectImageButtonIconComponent={{this.fileImageIconComponent}}
      @clearProgressButtonIconComponent={{this.clearProgressButtonIconComponent}}
      @acceptEditsButtonIconComponent={{this.acceptEditsButtonIconComponent}}
      @selectImageButtonClass="btn btn-outline-primary margin-bottom-md"
      @clearProgressButtonClass="btn btn-outline-gray-medium margin-bottom-md"
      @acceptEditsButtonClass="btn btn-success"
      @saveActionOnEdit={{true}}
      @showAcceptEditsButton={{true}}
      @showResetRotateAndFlipButton={{true}}
      @invalidFiletypeSelectedAction={{this.invalidFiletypeSelectedAction}}
    />`,
    );
    await processBreakdown(
      changeImageBreakdown,
      changeImageOutputs,
      assert,
      this,
    );
    // await this.pauseTest();
    await triggerEvent(
      '[data-test-id="ember-sundries-profile-image-editor-select-image-button"] input',
      'change',
      {
        files: [textFile],
      },
    );
  });
});

async function processBreakdown(breakdown, expectations, assert, env) {
  for (var item of breakdown) {
    const { selector, checks } = item;
    for (var check of checks) {
      await waitFor(selector);
      const method = item.method || click;
      let args = null;
      if (item.method === fillIn) {
        args = [check.split('FillIn')[1]];
      } else {
        args = item.arguments || [];
      }
      await method(selector, ...args);
      await waitForMs(30);
      assert.equal(
        env.latestOutput.width50px,
        expectations[check]?.width50px,
        `${check} width50px output is correct [DATA-URI]${env.latestOutput.width50px}`,
      );
      assert.equal(
        env.latestOutput.width80px,
        expectations[check]?.width80px,
        `${check} width80px output is correct [DATA-URI]${env.latestOutput.width80px}`,
      );
    }
  }
}

async function waitForMs(ms) {
  const startTimeEpoch = Date.now();
  await waitUntil(
    function () {
      return Date.now() - startTimeEpoch > ms;
    },
    { timeout: ms + 1000 },
  );
  return;
}

const rotateFlipAndZoomBreakdown = [
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-rotate-clockwise-button"]',
    checks: [
      'rotate90Clockwise1',
      'rotate90Clockwise2',
      'rotate90Clockwise3',
      'rotate90Clockwise4',
    ],
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-rotate-anti-clockwise-button"]',
    checks: [
      'rotate90Anticlockwise1',
      'rotate90Anticlockwise2',
      'rotate90Anticlockwise3',
      'rotate90Anticlockwise4',
    ],
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-flip-horizontally-button"]',
    checks: ['flipHorizontally1', 'flipHorizontally2'],
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-flip-vertically-button"]',
    checks: ['flipVertically1', 'flipVertically2'],
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-zoom-slider"]',
    checks: ['zoomSlideFillIn0.7', 'zoomSlideFillIn0.8'],
    method: fillIn,
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-zoom-in-button"]',
    checks: ['zoomIn1', 'zoomIn2', 'zoomIn3', 'zoomIn4'],
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-zoom-slider"]',
    checks: ['zoomSlideFillIn0.7'],
    method: fillIn,
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-zoom-out-button"]',
    checks: ['zoomOut1', 'zoomOut2', 'zoomOut3', 'zoomOut4'],
  },
];

const resetRotateFlipAndZoomBreakdown = [
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-zoom-slider"]',
    checks: ['zoomSlideFillIn0.7'],
    method: fillIn,
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-reset-rotate-and-flip-button"]',
    checks: ['resetRotateAndFlip1'],
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-zoom-in-button"]',
    checks: ['zoomIn1'],
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-reset-rotate-and-flip-button"]',
    checks: ['resetRotateAndFlip1'],
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-rotate-clockwise-button"]',
    checks: ['rotate90Clockwise1'],
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-reset-rotate-and-flip-button"]',
    checks: ['resetRotateAndFlip1'],
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-flip-horizontally-button"]',
    checks: ['flipHorizontally1'],
  },
  {
    selector:
      '[data-test-id="ember-sundries-profile-image-editor-reset-rotate-and-flip-button"]',
    checks: ['resetRotateAndFlip1'],
  },
];
let counter;
function generateOutputs(output, breakdown) {
  const flipRotateChecksFlat = breakdown.map((item) => item.checks).flat();
  saveActionOutputs[flipRotateChecksFlat[counter]] = output;
  counter++;
}

function drawDataUris() {
  const pres = document.querySelectorAll(
    '.test-expected pre, .test-actual pre',
  );
  pres.forEach((item) => {
    const pretext = item.textContent;
    if (!pretext.startsWith(`"data:image`)) {
      return;
    }
    let img = document.createElement('img');
    img.src = pretext.replace(/"/g, '');
    if (item.nextSibling) {
      return;
    }
    item.insertAdjacentElement('afterend', img);
  });
}

function dataUriToBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  // create a view into the buffer
  var ia = new Uint8Array(ab);
  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}
