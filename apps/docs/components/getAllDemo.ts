import { readFileSync } from 'fs';
import path from 'path';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'

export const getAllDemo = async (context: AppContext) => {
  const code = readFileSync(
    path.resolve(`./node_modules/@mergeui/demo/src/ui/Button.tsx`),
    'utf8'
  )
  const ctx = await App.getInitialProps(context)
 
  return { ...ctx, example: 'data' }
  console.log(code)
  return {
    props: {
      // ssg: {
      //   code,
      // },
    },
  };
};