import { defineConfig } from 'vite';
import crossedStyled from 'vite-plugin-crossed-styled';
import react from '@vitejs/plugin-react';
import reactNativeWeb from 'vite-plugin-react-native-web';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactNativeWeb(),
    crossedStyled.default({ configPath: './style.config.ts' }),
  ],
  resolve: {
    dedupe: ['react-native-web'],
  },
});
