 import cors from 'cors';

// Configura CORS para permitir solo un origen específico
const corsOptions = {
  origin: `http://${process.env.HOST}:3001`,
  optionsSuccessStatus: 200, // Algunas versiones antiguas de navegadores requieren este status
  credentials: true
};

app.use(cors(corsOptions));