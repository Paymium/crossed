import { Badge, Box, Text, XBox } from '@crossed/ui';
import { cx } from '@crossed/styled';
import Link from 'next/link';
import { useConfig } from 'nextra-theme-docs';
import { useFSRoute } from 'nextra/hooks';
import type { Item, MenuItem, PageItem } from 'nextra/normalize-pages';
import type { FC, ReactElement, ReactNode } from 'react';
// import { Anchor } from 'nextra-theme-docs';

export function renderComponent<T>(
  ComponentOrNode: FC<T> | ReactNode,
  props?: T
) {
  if (!ComponentOrNode) return null;
  if (typeof ComponentOrNode !== 'function') return ComponentOrNode;
  return <ComponentOrNode {...props} />;
}

export type NavBarProps = {
  flatDirectories: Item[];
  items: (PageItem | MenuItem)[];
};

const classes = {
  link: cx(
    'nx-text-sm contrast-more:nx-text-gray-700 contrast-more:dark:nx-text-gray-100'
  ),
  active: cx('nx-font-medium nx-subpixel-antialiased'),
  inactive: cx(
    'nx-text-gray-600 hover:nx-text-gray-800 dark:nx-text-gray-400 dark:hover:nx-text-gray-200'
  ),
};

export function Navbar({ flatDirectories, items }: NavBarProps): ReactElement {
  const config = useConfig();
  const activeRoute = useFSRoute();

  return (
    <div className="nextra-nav-container nx-sticky nx-top-0 nx-z-20 nx-w-full nx-bg-transparent print:nx-hidden">
      <div
        className={cx(
          'nextra-nav-container-blur',
          'nx-pointer-events-none nx-absolute nx-z-[-1] nx-h-full nx-w-full nx-bg-white dark:nx-bg-dark',
          'nx-shadow-[0_2px_4px_rgba(0,0,0,.02),0_1px_0_rgba(0,0,0,.06)] dark:nx-shadow-[0_-1px_0_rgba(255,255,255,.1)_inset]',
          'contrast-more:nx-shadow-[0_0_0_1px_#000] contrast-more:dark:nx-shadow-[0_0_0_1px_#fff]'
        )}
      />
      <nav className="nx-mx-auto nx-flex nx-h-[var(--nextra-navbar-height)] nx-max-w-[90rem] nx-items-center nx-justify-end nx-gap-2 nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]">
        {config.logoLink ? (
          <Text
            href={typeof config.logoLink === 'string' ? config.logoLink : '/'}
            className="nx-flex nx-items-center hover:nx-opacity-75 ltr:nx-mr-auto rtl:nx-ml-auto"
          >
            {renderComponent(config.logo)}
          </Text>
        ) : (
          <div className="nx-flex nx-items-center ltr:nx-mr-auto rtl:nx-ml-auto">
            {renderComponent(config.logo)}
          </div>
        )}
        <Box className="flex-1" />
        {items.map((pageOrMenu) => {
          if (pageOrMenu.display === 'hidden') return null;

          const page = pageOrMenu as PageItem;
          let href = page.href || page.route || '#';

          // If it's a directory
          if (page.children) {
            href =
              (page.withIndexPage ? page.route : page.firstChildRoute) || href;
          }

          const isActive =
            page.route === activeRoute ||
            activeRoute.startsWith(page.route + '/');
          let render = null;
          if (page.title.endsWith('[beta]')) {
            render = (
              <Badge
                color="blue"
                text="BETA"
                variant={isActive ? 'filled' : 'outlined'}
              />
            );
          } else if (page.title.endsWith('[api-draft]')) {
            render = (
              <Badge
                color="orange"
                text="API-DRAFT"
                variant={isActive ? 'filled' : 'outlined'}
              />
            );
          }
          return (
            <Link
              href={href}
              key={href}
              target={page.newWindow ? '_blank' : '_self'}
              className={cx(
                classes.link,
                'nx-relative -nx-ml-2 nx-hidden nx-whitespace-nowrap nx-p-2 md:nx-inline-block',
                !isActive || page.newWindow ? classes.inactive : classes.active
              )}
            >
              <span className="nx-absolute nx-inset-x-0 nx-text-center">
                <XBox
                  space="xs"
                  center
                  className={cx(
                    classes.link,
                    'nx-relative -nx-ml-2 nx-hidden nx-whitespace-nowrap nx-p-2 md:nx-inline-block',
                    !isActive || page.newWindow
                      ? classes.inactive
                      : classes.active
                  )}
                >
                  <Text color={'inherit'} size={false}>
                    {page.title.replace(/\[(doc|beta|alpha|api-draft)\]/g, '')}
                  </Text>
                  {render}
                </XBox>
              </span>
              <span className="nx-invisible nx-font-medium">
                <XBox
                  space="xs"
                  center
                  className={cx(
                    'justify-between',
                    classes.link,
                    'nx-relative -nx-ml-2 nx-hidden nx-whitespace-nowrap nx-p-2 md:nx-inline-block',
                    !isActive || page.newWindow
                      ? classes.inactive
                      : classes.active
                  )}
                >
                  <Text color={'inherit'} size={false}>
                    {page.title.replace(
                      /(\[beta\]|\[alpha\]|\[api-draft\])/g,
                      ''
                    )}
                  </Text>
                  {render}
                </XBox>
              </span>
              {/* </Text> */}
            </Link>
          );
        })}

        {renderComponent(config.search.component, {
          directories: flatDirectories,
          className: 'nx-hidden md:nx-inline-block mx-min-w-[200px]',
        })}

        {config.project.link ? (
          <Link href={config.project.link} target={'_blank'}>
            <Text className="nx-p-2 nx-text-current" color={'inherit'}>
              {renderComponent(config.project.icon)}
            </Text>
          </Link>
        ) : null}

        {/* <button
          type="button"
          aria-label="Menu"
          className="nextra-hamburger -nx-mr-2 nx-rounded nx-p-2 active:nx-bg-gray-400/20 md:nx-hidden"
          onClick={() => setMenu(!menu)}
        >
          <MenuIcon className={cn({ open: menu })} />
        </button> */}
      </nav>
    </div>
  );
}
