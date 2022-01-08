const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    if (dev) {
      server.use(
        '/api',
        createProxyMiddleware({
          target: 'http://localhost:8000',
          changeOrigin: true,
        })
      );
    }

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(4000, err => {
      if (err) throw err;
      console.log('Custom server ready on http://localhost:8000');
      console.log('Site up on http://localhost:4000');
    });
  })
  .catch(err => {
    console.log('Error in custom server', err);
  });
