const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy para Sales Service
  app.use('/api/sales', createProxyMiddleware({
    target: process.env.SALES_API_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/sales': '/api/sales' }
  }));

  // Proxy para Reservations Service
  app.use('/api/reservations', createProxyMiddleware({
    target: process.env.RESERVATIONS_API_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/reservations': '/api/reservations' }
  }));

  // Proxy para Products Service
  app.use('/api/products', createProxyMiddleware({
    target: process.env.PRODUCTS_API_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/products': '/products' }
  }));
};