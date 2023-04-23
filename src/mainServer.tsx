import React from 'react';
import { Response } from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import HtmlTemplate from './HtmlTemplate';

export interface IAssetMap {
  style: string;
  script: string;
}

async function render(url: string, res: Response, assetMap: IAssetMap) {
  let didError = false;

  const { pipe } = renderToPipeableStream(
    <HtmlTemplate assets={assetMap}>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </HtmlTemplate>,
    {
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('content-type', 'text/html');
        pipe(res);
      },
      onShellError() {
        res.statusCode = 500;
        res.setHeader('content-type', 'text/html');
        res.send('<h1>Something went wrong</h1>');
      },
      onError(err: unknown) {
        didError = true;
        console.error(err);
      },
      bootstrapModules: [assetMap.script],
    }
  );
}

export { render };
