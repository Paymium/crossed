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
  target,
}: {
  componentName: string;
  href: string;
  componentExtended: string;
  target?: '_blank';
}) => {
  const { t } = useTranslation();
  return (
    <P>
      {t('extended from', { componentName: componentName })}
      <Link href={href} target={target}>
        {componentExtended}
      </Link>
    </P>
  );
};
