import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@clients':  path.resolve(__dirname, './src/clients'),
      '@components':  path.resolve(__dirname, './src/components'),
      '@constants':  path.resolve(__dirname, './src/constants'),
      '@contexts':  path.resolve(__dirname, './src/contexts'),
      '@helpers':  path.resolve(__dirname, './src/helpers'),
      '@hooks':  path.resolve(__dirname, './src/hooks'),
      '@pages':  path.resolve(__dirname, './src/pages'),
      '@services':  path.resolve(__dirname, './src/services')
    }
  },
  plugins: [react(), svgr()],
})