/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';
import { LabelV3 } from '@crossed/ui/forms/Label';

export default function CreateLabel() {
  const { t } = useTranslation();
  return (
    <LabelV3>
      <LabelV3.Label>Mon Label</LabelV3.Label>
      <LabelV3.Input />
    </LabelV3>
    // <TemplatePrimitive
    //   title="createLabel"
    //   description={t('Creation primitive Label')}
    //   params={[
    //     {
    //       name: 'Root',
    //       description: 'Container of Label component',
    //       type: '(p: any) => ReactNode',
    //     },
    //     {
    //       name: 'Label',
    //       description: 'Text to show as Label',
    //       type: '(p: any) => ReactNode',
    //     },
    //     {
    //       name: 'Input',
    //       description: 'Input used for this Label component',
    //       type: '(p: any) => ReactNode',
    //     },
    //   ]}
    //   return={[
    //     { name: 'Label', description: 'Container of Label component' },
    //     { name: 'Label.Label', description: 'Text to show as Label' },
    //     {
    //       name: 'Label.input',
    //       description: 'Input used for this Label component',
    //     },
    //   ]}
    //   types={[]}
    //   anatomy={`
    // import { createLabel } from "@crossed/primitive";

    // const Label = createLabel({
    //   Root,
    //   Input,
    //   Label,
    // })

    // // Either use it in a composed way
    // <Label>
    //   <Label.Label>Votre Label</Label.Label>
    //   <Label.Input />
    // </Label>

    // // or in one line
    // <Label props={props}/>
    // `}
    //   example={`
    // import { createLabel } from "@crossed/primitive";

    // const Input = createLabel({
    //   Root,
    //   Input,
    //   Label,
    // });

    // `}
    // />
  );
}
