import { defineConfig } from 'vite';

/* style.css is loaded via a plain <link> in index.html, so it never enters
   Vite's module graph and edits to it trigger no HMR. Watch it explicitly. */
const reloadOnPlainCss = {
  name: 'reload-on-plain-css',
  handleHotUpdate({ file, server }) {
    if (file.endsWith('style.css')) {
      server.ws.send({ type: 'full-reload', path: '*' });
      return [];
    }
  },
};

export default defineConfig({
  plugins: [reloadOnPlainCss],
  server: {
    // WSL2: inotify events from the Windows side can be missed; poll as a fallback
    watch: { usePolling: true, interval: 300 },
  },
});
