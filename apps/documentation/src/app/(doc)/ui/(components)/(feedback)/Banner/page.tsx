/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import {
  Banner,
  BannerAction,
  BannerDescription,
  BannerTitle,
  ButtonText,
  YBox,
} from '@crossed/ui';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Banner"
      description={t('Banner description')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`<YBox space="xs">
  <Banner status="success"> 
    <Banner.Title>Sollicitudin</Banner.Title>
    <Banner.Description>
      Lorem ipsum dolor sit amet
    </Banner.Description>
    <BannerAction>
      <ButtonText>Button</ButtonText>
    </BannerAction>
  </Banner>
  <Banner status="info"> 
    <Banner.Title>Sollicitudin</Banner.Title>
    <Banner.Description>
      Lorem ipsum dolor sit amet
    </Banner.Description>
    <BannerAction>
      <ButtonText>Button</ButtonText>
    </BannerAction>
  </Banner>
  <Banner status="warning"> 
    <Banner.Title>Sollicitudin</Banner.Title>
    <Banner.Description>
      Lorem ipsum dolor sit amet
    </Banner.Description>
    <BannerAction>
      <ButtonText>Button</ButtonText>
    </BannerAction>
  </Banner>
  <Banner status="error"> 
    <Banner.Title>Sollicitudin</Banner.Title>
    <Banner.Description>
      Lorem ipsum dolor sit amet
    </Banner.Description>
    <BannerAction>
      <ButtonText>Button</ButtonText>
    </BannerAction>
  </Banner>
</YBox>`}
      scope={{
        Banner,
        BannerDescription,
        BannerTitle,
        BannerAction,
        ButtonText,
        YBox,
      }}
    />
  );
}
