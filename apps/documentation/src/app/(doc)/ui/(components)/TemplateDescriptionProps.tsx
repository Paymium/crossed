/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Link } from '@/components/Link';
import { P } from '@crossed/ui';
import { useTranslation } from 'react-i18next';

export const TemplateDescriptionProps = ({
  componentName,
  href,
  componentExtended,
  blank = false,
}: {
  componentName: string;
  href: string;
  componentExtended: string;
  blank?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <P>
      {componentName + ' ' + t('extended from') + ' '}
      <Link href={href} hrefAttrs={blank ? { target: '_blank' } : null}>
        {componentExtended}
      </Link>
    </P>
  );
};
