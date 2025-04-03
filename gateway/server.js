require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('./config/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
// Middlewares base
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); 

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX
});
app.use(limiter);

require('./routes/proxies')(app);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`API Gateway running on port ${process.env.PORT}`);
});