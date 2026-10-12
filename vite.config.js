import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project from its repository subpath. Vercel serves
// the app at the domain root, so its built assets must use root-relative paths.
const base = process.env.GITHUB_ACTIONS === 'true'
  ? '/IntelliStack_Systems_OptimusMaximus/'
  : '/';

export default defineConfig({
  plugins: [react()],
  base,
});
