import httpProxy from 'http-proxy';
import fs from 'fs';
import ErrorHandler from '../Application/Errors/ErrorHandler';

const proxy = httpProxy.createProxyServer({
  ssl: {
    key: fs.readFileSync(
      `/etc/letsencrypt/live/${process.env.DOMAIN}/privkey.pem`
    ),
    cert: fs.readFileSync(
      `/etc/letsencrypt/live/${process.env.DOMAIN}/fullchain.pem`
    )
  },
  target: `ws://127.0.0.1:${process.env.TARGET_PORT}`,
  secure: true,
  ws: true
});

proxy.on('error', e => {
  new ErrorHandler().error(e);
});

proxy.listen(443);
