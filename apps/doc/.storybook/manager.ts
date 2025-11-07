import './styleManager.css';
import { addons } from '@storybook/manager-api';
import {lightStoryBook} from './theme';

addons.setConfig({
  theme: lightStoryBook,
});
