import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import { ViteDevServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.VITEST;
const PORT = process.env.PORT || 3333;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const app = express();
  const resolve = (p: string) => path.resolve(__dirname, p);
  let vite: ViteDevServer;

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: true,
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res) => {
    try {
      if (!isProd) {
        const render = (await vite.ssrLoadModule('./src/mainServer.tsx')).render;
        const assetMap = { script: 'src/mainClient.tsx' };
        render(req, res, assetMap);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const render = (await import('./dist/server/mainServer.js')).render;
        const script =
          '/assets/' +
          fs.readdirSync(resolve('./dist/client/assets')).filter((fn: string) => fn.endsWith('js'));
        const style =
          '/assets/' +
          fs
            .readdirSync(resolve('./dist/client/assets'))
            .filter((fn: string) => fn.endsWith('css'));
        const assetMap = { style, script };
        render(req.originalUrl, res, assetMap);
      }
    } catch (e) {
      if (e instanceof Error) {
        !isProd && vite.ssrFixStacktrace(e);
        console.log(e.stack);
        res.status(500).end(e.stack);
      }
    }
  });

  return { app };
}

if (!isTest) {
  createServer()
    .then(({ app }) =>
      app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
      })
    )
    .catch((e) => console.error(e));
}
