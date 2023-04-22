import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const isProd = process.env.NODE_ENV === 'production';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

const app = express();

if (isProd) {
  const html = fs.readFileSync(path.resolve(__dirname, './index.html')).toString();
  const parts = html.split('not rendered');

  app.use('assets', express.static(path.resolve(__dirname, './dist/client/assets')));
  app.use(async (req, res) => {
    const render = (await import('./dist/server/mainServer.js')).render;
    res.write(parts[0]);
    const stream = render(req.url, {
      onShellReady() {
        stream.pipe(res);
      },
      onShellError() {
        // do error handling
      },
      onAllReady() {
        res.write(parts[1]);
        res.end();
      },
      onError(err) {
        console.error(err);
      },
    });
  });
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: true,
    appType: 'custom',
  });
  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.url;

    try {
      let html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      html = await vite.transformIndexHtml(url, html);
      const parts = html.split('not rendered');
      const { default: render } = await vite.ssrLoadModule('./src/mainServer.tsx');
      const { pipe } = await render(url, {
        onShellReady() {
          res.write(parts[0]);
          pipe(res);
        },
        onAllReady() {
          res.write(parts[1]);
          res.end();
        },
      });
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
