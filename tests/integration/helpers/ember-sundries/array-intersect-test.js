import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Helper | ember-sundries/array-intersect',
  function (hooks) {
    setupRenderingTest(hooks);

    // TODO: Replace this with your real tests.
    test('it renders', async function (assert) {
      this.set('inputValue', '1234');

      await render(hbs`{{ember-sundries/array-intersect this.inputValue}}`);

      assert.dom().hasText('1234');
    });
  }
);
