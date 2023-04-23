import React from 'react';
import { ReactNode } from 'react';
import { IAssetMap } from './mainServer';

interface IHtmlProps {
  assets: IAssetMap;
  children: ReactNode;
}

function HtmlTemplate({ assets, children }: IHtmlProps) {
  const PORT = process.env.PORT;
  return (
    <html lang="en">
      <head>
        {import.meta.env.DEV && (
          <script
            type="module"
            dangerouslySetInnerHTML={{
              __html: `
                import RefreshRuntime from 'http://localhost:${
                  PORT ? PORT : '3333'
                }/@react-refresh';
                RefreshRuntime.injectIntoGlobalHook(window);
                window.$RefreshReg$ = () => {};
                window.$RefreshSig$ = () => (type) => type;
                window.__vite_plugin_react_preamble_installed__ = true;
                `,
            }}
          />
        )}
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        {assets['style'] && <link rel="stylesheet" href={assets['style']} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

export default HtmlTemplate;
