/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { H1, P, YBox, Kbd } from '@crossed/ui';

export default function Home() {
  return (
    <YBox role="main">
      <H1 id="introduction">Introduction</H1>
      <P>
        <Kbd>@crossed/style</Kbd> permet de créer des primitives
      </P>
    </YBox>
  );
}
