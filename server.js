import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
// import renderApp from './dist/server/ServerApp.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

// const html = fs.readFileSync(path.resolve(__dirname, './index.html')).toString();

// const parts = html.split('not rendered');

const app = express();

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
    let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
    template = await vite.transformIndexHtml(url, template);
    const html = template.split('not rendered');
    const { render } = await vite.ssrLoadModule('./src/mainServer.tsx');
    const { pipe } = await render(url, {
      onShellReady() {
        res.write(html[0]);
        pipe(res);
      },
      onAllReady() {
        res.write(html[1]);
        res.end();
      },
    });
  } catch (e) {
    vite.ssrFixStacktrace(e);
    next(e);
  }
});

// app.use('assets', express.static(path.resolve(__dirname, './dist/client/assets')));
// app.use((req, res) => {
//   res.write(parts[0]);
//   const stream = renderApp(req.url, {
//     onShellReady() {
//       stream.pipe(res);
//     },
//     onShellError() {
//       // do error handling
//     },
//     onAllReady() {
//       res.write(parts[1]);
//       res.end();
//     },
//     onError(err) {
//       console.error(err);
//     },
//   });
// });

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
