const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'gateway.log' })
  ]
});

// Middleware personalizado
module.exports = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip
  });
  next();
};