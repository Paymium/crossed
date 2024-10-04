import { addons } from '@storybook/manager-api';
import {lightStoryBook} from './theme';

addons.setConfig({
  theme: lightStoryBook,
});

// export const parameters = {
//   darkMode: {
//     // Override the default dark theme
//     dark: dark,
//     // Override the default light theme
//     light: light,
//     darkClass: 'dark',
//     lightClass: 'light',
//     classTarget: 'html',
//     stylePreview: true
//   }
//   docs: {
//     container: props => {
//       const [isDark, setDark] = React.useState();

//       const onChangeHandler = () => {
//         channel.emit(UPDATE_DARK_MODE_EVENT_NAME);
//       };

//       React.useEffect(() => {
//         channel.on(DARK_MODE_EVENT_NAME, setDark);
//         return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
//       }, [channel, setDark]);

//       return (
//         <div>
//           <input type="checkbox" onChange={onChangeHandler} />
//           <DocsContainer {...props} />
//         </div>
//       );
//     }
//   }
// };