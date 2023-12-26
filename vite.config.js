import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import styleX from "vite-plugin-stylex";
console.log('[ manifest ] >', manifest)


export default defineConfig({
  plugins: [
    react(),
    styleX(),
    crx({ manifest }),
  ],
})