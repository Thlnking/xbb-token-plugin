import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import styleX from "vite-plugin-stylex";


export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    styleX()
  ],
})