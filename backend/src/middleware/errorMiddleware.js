import logger from '../loggers/logger.js';

const errorMiddleware = (err, req, res, next) => {
  // Registra el error usando Winston
  logger.error(err.message);

  // Envía una respuesta de error al cliente
  res.status(500).json({
    error: 'Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.'
  });
};

export default errorMiddleware;