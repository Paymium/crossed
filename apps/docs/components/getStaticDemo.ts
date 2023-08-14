import { readFileSync } from 'fs';
import path from 'path';

export const getStaticDemo = (pathTmp: string) => () => {
  const code = readFileSync(
    path.resolve(`./node_modules/@crossed/demo/src/${pathTmp}.tsx`),
    'utf8'
  );
  return {
    props: {
      ssg: {
        code,
      },
    },
  };
};
