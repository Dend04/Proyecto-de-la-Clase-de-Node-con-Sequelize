import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

// Lista de orígenes permitidos
const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_1 || 'http://localhost:3000', // Permite solicitudes desde el puerto 3000
  process.env.ALLOWED_ORIGIN_2 || 'http://localhost:3001', // Permite solicitudes desde el puerto 3001
  // Agrega otros orígenes permitidos según sea necesario
];

// Configura CORS para permitir solo los orígenes en la lista
const corsOptions = {
  origin: (origin, callback) => {
    // Verifica si el origen está en la lista de permitidos
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Permite la solicitud
    } else {
      callback(new Error('Origen no permitido por CORS')); // Rechaza la solicitud
    }
  },
  optionsSuccessStatus: 200, // Algunas versiones antiguas de navegadores requieren este status
  credentials: true, // Permite el envío de credenciales (cookies, encabezados de autorización, etc.)
};

export default cors(corsOptions);v