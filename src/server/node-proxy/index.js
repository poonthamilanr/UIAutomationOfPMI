const express = require('express');
const compression = require('compression');
const scProxy = require('@sitecore-jss/sitecore-jss-proxy').default;
const config = require('./config');

const server = express();
const port = config.nodeServerPort || 3000;

// enable gzip compression for appropriate file types
server.use(compression());

// turn off x-powered-by http header
server.settings['x-powered-by'] = false;

// Serve static app assets from local /dist folder
server.use(
  '/dist',
  express.static('dist', {
    fallthrough: false, // force 404 for unknown assets under /dist
  })
);

if (config.disableSSR) {
	server.get('*', function (req, res) {
      res.sendFile(__dirname + '/dist/cert-app/index.html');
	});
} else {
    // For any other requests, we render app routes server-side and return them
    server.use('*', scProxy(config.serverBundle.renderView, config, config.serverBundle.parseRouteUrl));
}

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
