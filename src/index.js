import './bun/svelte-loader.js';
// import App from './lib/app.js';
import App from './lib/App.svelte';

const server = Bun.serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === '/') {
      const searchParams = Object.fromEntries(url.searchParams);
      const { width = 600, height = 600 } = searchParams;
      const { html, css } = App.render({ ssr: true, width: width, height: height });
      const title = `Bun + Svelte (SSR)`;
      return new Response(
        `<html>
        <head>
          <style>
            body, #graph {display: flex; flex-direction: column; justify-content: center; align-items: center;}
            ${css.code}
          </style>
        </head>
        <body><h1>${title}</h1>
        <div id="graph">${html}</div>
        </body>
      </html>`,
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }
  },
});
