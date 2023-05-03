import express from 'express';
import { createServer } from 'vite';

import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HTML = path.resolve(__dirname, 'index.html');

const PORT = process.env.PORT || 3333;

async function startServer() {
  const app = express();
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

  app.use(vite.middlewares);

  app.use('*', async (request, response) => {
    const url = request.originalUrl;

    try {
      let template = fs.readFileSync(HTML, 'utf8');
      template = await vite.transformIndexHtml(url, template);
      const [startHTML, endHTML] = template.split('not rendered');
      const render = (await vite.ssrLoadModule('./src/mainServer.tsx')).render;

      try {
        response.write(startHTML);
        const stream = render(url, {
          onShellReady() {
            stream.pipe(response);
          },
          onAllReady() {
            response.write(endHTML);
            response.end();
          },
        });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  });

  return app;
}

startServer().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
  });
});
