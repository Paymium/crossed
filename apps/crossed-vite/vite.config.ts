import { defineConfig } from 'vite'
import crossedStyled from "vite-plugin-crossed-styled";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), crossedStyled.default({configPath:'./style.config.ts'})],
})
