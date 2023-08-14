#!/usr/bin/env node
/* eslint-disable no-console */

const exec = require('execa');
const fs = require('fs-extra');
const esbuild = require('esbuild');
const fg = require('fast-glob');
const createExternalPlugin = require('./externalNodePlugin');
const debounce = require('lodash.debounce');
const { dirname } = require('path');

const jsOnly = !!process.env.JS_ONLY;
const skipJS = !!(process.env.SKIP_JS || false);
const shouldSkipTypes = !!(
  process.argv.includes('--skip-types') || process.env.SKIP_TYPES
);
const shouldBundle = !!process.argv.includes('--bundle');
const shouldIncludeMjs = !!process.argv.includes('--output-mjs');
const shouldBundleNodeModules = !!process.argv.includes('--bundle-modules');
const shouldClean = !!process.argv.includes('clean');
const shouldCleanBuildOnly = !!process.argv.includes('clean:build');
const shouldWatch = process.argv.includes('--watch');
const declarationToRoot = !!process.argv.includes('--declaration-root');
const ignoreBaseUrl = process.argv.includes('--ignore-base-url');
const baseUrlIndex = process.argv.indexOf('--base-url');
const baseUrl = baseUrlIndex > -1 ? process.argv[baseUrlIndex] : '.';

const pkg = fs.readJSONSync('./package.json');
let shouldSkipInitialTypes = !!process.env.SKIP_TYPES_INITIAL;
const pkgMain = pkg.main;
const pkgModule = pkg.module;
const pkgModuleJSX = pkg['module:jsx'];
const pkgTypes = Boolean(pkg['types'] || pkg['typings']);

const flatOut = [pkgMain, pkgModule, pkgModuleJSX].filter(Boolean).length === 1;

async function clean() {
  try {
    await Promise.allSettled([
      //
      fs.remove('.turbo'),
      fs.remove('.ultra.cache.json'),
      fs.remove('lib'),
    ]);
  } catch {
    // ok
  }
  if (shouldCleanBuildOnly) {
    console.log('🔹 cleaned', pkg.name);
    process.exit(0);
  }
  try {
    await Promise.allSettled([fs.remove('node_modules')]);
  } catch {
    // ok
  }
  console.log('🔹 cleaned', pkg.name);
  process.exit(0);
}

if (shouldClean || shouldCleanBuildOnly) {
  clean().then(() => {
    process.exit(0);
  });
  return;
}

if (shouldWatch) {
  process.env.IS_WATCHING = true;
  process.env.DISABLE_AUTORUN = true;
  const rebuild = debounce(build, 100);
  const chokidar = require('chokidar');

  // do one js build but not types
  build({
    skipTypes: true,
  });

  chokidar
    // prevent infinite loop but cause race condition if you just build directly
    .watch('src', {
      persistent: true,
      alwaysStat: true,
      ignoreInitial: true,
    })
    .on('change', rebuild)
    .on('add', rebuild);
  return;
}

build();

async function build({ skipTypes } = {}) {
  if (process.env.DEBUG) console.log('🔹', pkg.name);
  try {
    const start = Date.now();
    await Promise.all([
      //
      skipTypes ? null : buildTsc(),
      buildJs(),
    ]);
    console.log('built', pkg.name, 'in', Date.now() - start, 'ms');
  } catch (error) {
    console.error(`Error building:`, error.message);
  }
}

// const targetDir = `.types${Math.floor(Math.random() * 1_000_000)}`
// const cleanup = () => {
//   try {
//     fs.removeSync(targetDir)
//   } catch {
//     // ok
//   }
// }

// process.once('beforeExit', cleanup)
// process.once('SIGINT', cleanup)
// process.once('SIGTERM', cleanup)

async function buildTsc() {
  if (!pkgTypes) return;
  if (jsOnly || shouldSkipTypes) return;
  if (shouldSkipInitialTypes) {
    shouldSkipInitialTypes = false;
    return;
  }

  const targetDir = 'lib/typescript';
  try {
    // typescripts build cache messes up when doing declarationOnly
    await fs.remove('tsconfig.tsbuildinfo');
    await fs.ensureDir(targetDir);

    const declarationToRootFlag = declarationToRoot
      ? ' --declarationDir ./'
      : '';
    const baseUrlFlag = ignoreBaseUrl ? '' : ` --baseUrl ${baseUrl}`;
    const cmd = `tsc${baseUrlFlag} --outDir ${targetDir} --rootDir src ${declarationToRootFlag}--emitDeclarationOnly --declarationMap`;

    // console.log('\x1b[2m$', `npx ${cmd}`)
    await exec('npx', cmd.split(' '));
  } catch (err) {
    console.log(err.message);
    if (!shouldWatch) {
      process.exit(1);
    }
  } finally {
    await fs.remove('tsconfig.tsbuildinfo');
  }
}

async function buildJs() {
  if (skipJS) {
    return;
  }
  let files = (await fg(['src/**/*.(m)?[jt]s(x)?', 'src/**/*.css'])).filter(
    (x) => !x.includes('.d.ts')
  );
  const externalPlugin = createExternalPlugin({
    skipNodeModulesBundle: true,
  });

  const external = shouldBundle ? ['@swc/*', '*.node'] : undefined;

  const start = Date.now();
  return await Promise.all([
    pkgMain
      ? esbuildWriteIfChanged({
          entryPoints: files,
          outdir: flatOut ? 'lib' : 'lib/commonjs',
          bundle: shouldBundle,
          external,
          sourcemap: true,
          sourcesContent: false,
          target: 'node14',
          keepNames: false,
          format: 'cjs',
          color: true,
          allowOverwrite: true,
          jsx: 'automatic',
          logLevel: 'error',
          plugins: shouldBundleNodeModules ? [] : [externalPlugin],
          minify: process.env.MINIFY ? true : false,
          platform: 'node',
        })
      : null,
    pkgModule
      ? esbuildWriteIfChanged({
          entryPoints: files,
          outdir: flatOut ? 'lib' : 'lib/module',
          bundle: shouldBundle,
          external,
          sourcemap: true,
          sourcesContent: false,
          target: 'node16',
          keepNames: false,
          jsx: 'automatic',
          allowOverwrite: true,
          format: 'esm',
          color: true,
          logLevel: 'error',
          minify: process.env.MINIFY ? true : false,
          platform: shouldBundle ? 'node' : 'neutral',
        })
      : null,
    pkgModule && shouldIncludeMjs
      ? esbuildWriteIfChanged({
          entryPoints: files,
          outExtension: { '.js': '.mjs' },
          outdir: flatOut ? 'lib' : 'lib/module',
          bundle: shouldBundle,
          external,
          sourcemap: true,
          sourcesContent: false,
          target: 'node16',
          keepNames: false,
          jsx: 'automatic',
          allowOverwrite: true,
          format: 'esm',
          color: true,
          logLevel: 'error',
          minify: process.env.MINIFY ? true : false,
          platform: shouldBundle ? 'node' : 'neutral',
        })
      : null,
    pkgModuleJSX
      ? esbuildWriteIfChanged({
          // only diff is jsx preserve and outdir
          jsx: 'preserve',
          outdir: flatOut ? 'lib' : 'lib/jsx',
          outExtension: { '.js': '.mjs' },
          entryPoints: files,
          bundle: shouldBundle,
          external,
          sourcemap: true,
          sourcesContent: false,
          allowOverwrite: true,
          target: 'es2020',
          keepNames: false,
          format: 'esm',
          color: true,
          logLevel: 'error',
          minify: process.env.MINIFY ? true : false,
          platform: 'neutral',
        })
      : null,
    pkgModuleJSX
      ? esbuildWriteIfChanged({
          // only diff is jsx preserve and outdir
          jsx: 'preserve',
          outdir: flatOut ? 'lib' : 'lib/jsx',
          entryPoints: files,
          bundle: shouldBundle,
          sourcemap: true,
          sourcesContent: false,
          allowOverwrite: true,
          target: 'es2020',
          keepNames: false,
          format: 'esm',
          color: true,
          logLevel: 'error',
          minify: process.env.MINIFY ? true : false,
          platform: 'neutral',
        })
      : null,
  ]).then(() => {
    if (process.env.DEBUG) console.log(`built js in ${Date.now() - start}ms`);
  });
}

/**
 * esbuild but avoids touching unchanged files to not freak out vite
 * @param {esbuild.BuildOptions} opts
 * @returns {Promise<void>}
 */
async function esbuildWriteIfChanged(opts) {
  if (shouldWatch) {
    const built = await esbuild.build({ ...opts, write: false });
    if (!built.outputFiles) {
      return;
    }
    await Promise.all(
      built.outputFiles.map(async (file) => {
        const outDir = dirname(file.path);
        await fs.ensureDir(outDir);
        const outString = new TextDecoder().decode(file.contents);
        if (
          !(await fs.pathExists(file.path)) ||
          (await fs.readFile(file.path, 'utf8')) !== outString
        ) {
          // console.log('write', file.path)
          await fs.writeFile(file.path, outString);
        }
      })
    );
  } else {
    await esbuild.build(opts);
  }
}
