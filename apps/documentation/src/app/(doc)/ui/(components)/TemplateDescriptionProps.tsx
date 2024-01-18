import { Anchor, P } from '@crossed/ui';
import { useTranslation } from 'react-i18next';

export const TemplateDescriptionProps = ({
  composantName,
  link,
  composantExtended,
  blank = false,
}: {
  composantName: string;
  link: string;
  composantExtended: string;
  blank?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <P>
      {composantName + ' ' + t('extended from') + ' '}
      <Anchor href={link} hrefAttrs={blank ? { target: '_blank' } : null}>
        {composantExtended}
      </Anchor>
    </P>
  );
};
