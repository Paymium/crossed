import { readFileSync } from 'fs';
import path from 'path';

export const getStaticPaths = async ({ params: { slug }}) => {
  console.log(slug)
  const code = readFileSync(
    path.resolve(`./node_modules/@mergeui/demo/src/typography/${slug}.tsx`),
    'utf8'
  )
 
  return {
    props: {
      ssg: {
        code,
      },
    },
  };
};