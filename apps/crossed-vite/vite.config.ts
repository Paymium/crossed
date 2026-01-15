import { defineConfig } from 'vite';
import crossedStyled from '@crossed/vite-plugin';
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
