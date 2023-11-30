import { declare } from '@babel/helper-plugin-utils';
import type { Visitor } from '@babel/traverse';
import path from 'path';
import template from '@babel/template';
import generate from '@babel/generator';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

export default declare(function crosseBabel(
  { types: t },
  { tailwindPath }: { tailwindPath?: string },
  dirname = __dirname
): {
  name: string;
  visitor: Visitor;
} {
  const titi = path.resolve(dirname, tailwindPath || 'tailwind.config.js');

  const configString = readFileSync(titi);

  const configTailwind = template.ast(configString.toString()); // 7.23.3

  const configTailwindAst = Array.isArray(configTailwind)
    ? configTailwind.find((e) => t.isExpressionStatement(e))
    : configTailwind;

  if (!configTailwindAst) {
    throw new Error(`tailwind.config.js export not found`);
  }

  if (!t.isExpressionStatement(configTailwindAst)) {
    throw new Error(`tailwind.config.js is not "ExpressionStatement"`);
  }

  if (!t.isAssignmentExpression(configTailwindAst.expression)) {
    throw new Error(`tailwind.config.js is not "AssignmentExpression"`);
  }

  if (!t.isObjectExpression(configTailwindAst.expression.right)) {
    throw new Error(`tailwind.config.js export is not object`);
  }

  const pathConfig = t.stringLiteral(
    path.resolve(dirname, tailwindPath || 'tailwind.config.js')
  );

  const build = template(`
    var { create } = require('@crossed/styled/lib/commonjs/twrnc');
    var config = require(ROOT_DIR);

    module.exports = create(config);
  `);

  const astBuild = build({ ROOT_DIR: pathConfig });
  const pathCrossed = path.resolve(dirname, '.crossed');
  const pathFile = path.resolve(pathCrossed, 'crossed.config.js');

  if (!existsSync(pathCrossed)) {
    mkdirSync(pathCrossed);
  }
  writeFileSync(
    pathFile,
    generate(t.program(Array.isArray(astBuild) ? astBuild : [astBuild])).code,
    { encoding: 'utf-8' }
  );

  return {
    name: 'crossed',
    visitor: {
      ImportDeclaration({ node }, state: any) {
        if (
          t.isStringLiteral(node.source, { value: 'twrnc' }) &&
          !state.filename.endsWith('src/twrnc.ts')
        ) {
          node.source = t.stringLiteral(pathFile);
        }
      },
    },
  };
});
