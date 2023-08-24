import {
  checkIfWorkspace,
  getDependenciesFromNodeModules,
  getExactDependenciesFromNodeModules,
} from './utils';
const findWorkspaceRoot = require('find-yarn-workspace-root');
const path = require('path');

const crossedDeps = ['@crossed', '@react-native-aria', '@expo', '@legendapp'];

const reactNativeDeps = [
  'react-native',
  'react-native-web',
  'react-native-svg',
  '@iconscout/react-native-unicons',
  'react-native-reanimated',
];

export default function withCrossed(nextConfig: any = {}) {
  const currDir = process.cwd();
  let rootDependencyList = [];
  try {
    rootDependencyList = getDependenciesFromNodeModules(currDir, crossedDeps);
  } catch (e) {}

  let rootExactDependencyList = [];
  try {
    rootExactDependencyList = getExactDependenciesFromNodeModules(
      currDir,
      reactNativeDeps
    );
  } catch (e) {}

  const workspaceRoot = findWorkspaceRoot(currDir); // Absolute path or null
  const metaWorkspace = checkIfWorkspace(currDir);

  let parentDependencyList = [];
  let parentExactDependencyList = [];

  if (metaWorkspace.isWorkspace) {
    try {
      parentDependencyList = getDependenciesFromNodeModules(
        path.resolve(currDir, '..'),
        crossedDeps
      );
      parentExactDependencyList = getExactDependenciesFromNodeModules(
        path.resolve(currDir, '..'),
        reactNativeDeps
      );
    } catch (e) {}
  }

  // if (metaWorkspace.isWorkspace) {
  //   parentDependencyList = getDependenciesFromNodeModules(
  //     path.resolve(currDir, '..'),
  //     ['@crossed', '@react-native-aria']
  //   );
  // }

  // if (workspaceRoot) {
  //   parentDependencyList = getDependenciesFromNodeModules(workspaceRoot, [
  //     '@crossed',
  //     '@react-native-aria',
  //     '@legendapp',
  //     '@expo/html-elements',
  //     'crossed',
  //   ]);
  // }
  if (workspaceRoot) {
    try {
      parentDependencyList = getDependenciesFromNodeModules(
        workspaceRoot,
        crossedDeps
      );
      parentExactDependencyList =
        getExactDependenciesFromNodeModules(workspaceRoot);
    } catch (e) {}
  }

  let crossedUITranspileModules = Array.from(
    new Set([
      '@iconscout/react-native-unicons',
      'react-native-reanimated',
      ...rootDependencyList,
      ...parentDependencyList,
      ...rootExactDependencyList,
      ...parentExactDependencyList,
      ...(nextConfig.transpilePackages || []),
    ])
  );

  const updatedNextConfig = {
    ...nextConfig,
    transpilePackages: crossedUITranspileModules,
    webpack: (config: any, context: any) => {
      config = nextConfig.webpack
        ? nextConfig.webpack(config, context)
        : config;

      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'react-native$': 'react-native-web',
      };

      config.resolve.extensions = [
        '.web.js',
        '.web.ts',
        '.web.tsx',
        ...config.resolve.extensions,
      ];

      config.module.rules.push({
        test: /\.ttf$/,
        loader: 'url-loader',
      });

      return config;
    },
  };

  return updatedNextConfig;
}
