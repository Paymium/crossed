/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as Floating from '../index';

describe('Floating exports', () => {
  test('exports', () => {
    expect(Floating).toHaveProperty('Floating');
    expect(Floating).toHaveProperty('FloatingTrigger');
    expect(Floating).toHaveProperty('FloatingContent');
    expect(Floating).toHaveProperty('FloatingOverlay');
    expect(Floating).toHaveProperty('FloatingPortal');

    expect(Floating.Floating).toHaveProperty('Trigger');
    expect(Floating.Floating).toHaveProperty('Content');
    expect(Floating.Floating).toHaveProperty('Overlay');
    expect(Floating.Floating).toHaveProperty('Portal');
  });
});
