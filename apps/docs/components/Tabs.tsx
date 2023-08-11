import { withStaticProperties, type GetProps } from '@mergeui/ui';
import { useRouter } from 'next/router';
import { Tabs as TabsNext, Tab as TabNext } from 'nextra-theme-docs';
import { memo, useEffect } from 'react';

type TabsNextProps = Omit<GetProps<typeof TabsNext>, 'items'>;
export const Tabs = withStaticProperties(
  memo((props: TabsNextProps & { items: string[] }) => {
    const { push, query, asPath, pathname, isReady } = useRouter();
    const { t } = query as { t?: string };
    const index = props.items.findIndex(
      (e) => e.toLowerCase() === t?.toLowerCase()
    );

    useEffect(() => {
      if (isReady) {
        const time = setTimeout(() => {
          const [anchor] = asPath.match(/#(.*)$/g) || [];
          if (anchor) {
            let target = document.querySelector(`${anchor}`);

            if (!target) return;

            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 200);
        return () => clearTimeout(time);
      }
    }, [isReady]);

    return (
      <TabsNext
        {...props}
        key={'f'}
        selectedIndex={index >= 0 ? index : 0}
        onChange={(i) =>
          push({
            pathname: pathname,
            query: { ...query, t: props.items[i] },
          })
        }
      />
    );
  }),
  {
    Tab: TabNext,
  }
);
