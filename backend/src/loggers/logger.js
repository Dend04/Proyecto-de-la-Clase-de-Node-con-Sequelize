import { createLogger, format, transports } from 'winston';

// Define colores personalizados para la consola
const consoleFormat = format.combine(
  format.colorize(), // Aplica colores automáticamente a los niveles de log
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Formato sin colores para los archivos
const fileFormat = format.combine(
  format.timestamp(),
  format.json()
);

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      )
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: fileFormat
    }),
    new transports.File({
      filename: 'logs/informacion_combinada.log',
      format: fileFormat
    })
  ]
});

// Stream para Morgan
logger.stream = {
  write: function(message) {
    logger.info(message.trim());
  }
};

export default logger;