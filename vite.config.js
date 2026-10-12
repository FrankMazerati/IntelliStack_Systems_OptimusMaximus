import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project from its repository subpath.
  base: '/IntelliStack_Systems_OptimusMaximus/',
});
