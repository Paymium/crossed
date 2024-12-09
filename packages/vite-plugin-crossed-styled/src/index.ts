/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import reactNativeWeb from 'vite-plugin-react-native-web';
import { Plugin } from 'vite';
import { Loader } from '@crossed/loader';
import path from 'path';
import modifyModuleSourceLoader from './loader';
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'fs';

export type StylePluginOptions = {
  configPath?: string;
  level?: string;
  isServer?: boolean;
  isWatch?: boolean;
  out?: string;
};

const virtualModuleId = 'virtual:crossed.css';
const resolvedVirtualModuleId = '\0' + virtualModuleId;

export default function crossedStyled(
  options: StylePluginOptions = {}
): Plugin[] {
  const pathCss = options.out ?? path.resolve(process.cwd(), '.crossed');
  let css = '';
  try {
    statSync(pathCss);
  } catch {
    mkdirSync(pathCss, 0o775);
  }
  try {
    css = readFileSync(path.resolve(pathCss, 'crossed.css'), {
      encoding: 'utf-8',
    });
  } catch (e) {
    try {
      writeFileSync(path.resolve(pathCss, 'crossed.css'), '', {
        encoding: 'utf-8',
      });
    } catch (y) {}
  }

  const parseAst = new Loader({
    css,
    configPath: options.configPath,
    level: options.level,
    isWatch: options.isWatch,
    emit: () => {
      // this.writeCss(virtualModules);
    },
  });

  return [
    reactNativeWeb(),
    {
      name: 'virtual-crossed',
      resolveId(id) {
        if (id === virtualModuleId) {
          return resolvedVirtualModuleId;
        }
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
          return parseAst.getCSS();
        }
      },
    },
    {
      name: 'analyse-style',
      shouldTransformCachedModule() {
        return true;
      },
      transform(src, id) {
        if (
          /\.jsx?/.test(path.extname(id)) ||
          /\.tsx?/.test(path.extname(id)) ||
          /\.mdx?/.test(path.extname(id))
        ) {
          const result = modifyModuleSourceLoader(parseAst, src);
          const { moduleGraph, ws } = this.environment as any;
          if (moduleGraph) {
            const module = moduleGraph.getModuleById(resolvedVirtualModuleId);
            if (module) {
              moduleGraph.invalidateModule(module);
              if (ws) {
                ws.send({
                  type: 'full-reload',
                  path: '*',
                });
              }
            }
          }
          return {
            code: result,
            map: null,
          };
        }
      },
    },
  ];
}
