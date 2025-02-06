import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from './config/cors.js';
import sequelize from "./config/database.js";
import swaggerSetup from './config/swagger.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import preguntaRoutes from './routes/preguntaRoutes.js';
import testRoutes from './routes/testRoutes.js';
import rutinaRoutes from './routes/rutinaRoutes.js';
import resultadoRoutes from './routes/resultadoRoutes.js';
import respuestaRoutes from './routes/respuestaRoutes.js';
import { middleware } from "./middleware/middleware.js";
import logger from "./loggers/logger.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import Usuario from "./models/usuario_model.js";
import Test from "./models/test_model.js";
import Pregunta from "./models/pregunta_model.js";
import Respuesta from "./models/respuesta_model.js";
import Resultado from "./models/resultado_model.js";
import Rutina from "./models/rutina_model.js";
import faRoutes from './routes/faRoutes.js';
import path from "path";
import fs from 'fs';

dotenv.config();

// Relaciones

Pregunta.hasMany(Respuesta, { foreignKey: "preguntaId" });
Respuesta.belongsTo(Pregunta, { foreignKey: "preguntaId" });

Usuario.hasMany(Resultado, { foreignKey: "usuarioId" });
Resultado.belongsTo(Usuario, { foreignKey: "usuarioId" });

Resultado.hasMany(Rutina, { foreignKey: "resultadoId" });

Test.hasMany(Resultado, { foreignKey: "testId" });
Resultado.belongsTo(Test, { foreignKey: "testId" });

Usuario.hasMany(Resultado, { foreignKey: "usuarioId", onDelete: 'CASCADE' });
Resultado.belongsTo(Usuario, { foreignKey: "usuarioId", onDelete: 'CASCADE' });

const app = express();
const __dirname = path.resolve();

// Crear la carpeta uploads/fotosPerfil si no existe
const uploadDir = path.resolve(__dirname, 'uploads/fotosPerfil');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Usa Morgan con el stream de Winston
app.use(morgan('informacion_combinada', { stream: logger.stream }));

app.use(express.json()); // Para usar JSON

// Configurar Swagger
swaggerSetup(app);

// Usa el middleware
app.use(middleware);

// CORS
app.use(cors);

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', preguntaRoutes);
app.use('/api', testRoutes);
app.use('/api', resultadoRoutes);
app.use('/api', rutinaRoutes);
app.use('/api', respuestaRoutes);
app.use('/api', faRoutes);

// Servir archivos estáticos desde uploads/fotosPerfil
app.use('/uploads/fotosPerfil', express.static(uploadDir));

// Usa el middleware de manejo de errores
app.use(errorMiddleware);

// Sincronización Base de Datos
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

app.listen(process.env.PORT, () => {
  const blueColor = '\x1b[34m';
  const resetColor = '\x1b[0m';
  console.log(`${blueColor}Servidor corriendo en http://localhost:${process.env.PORT}${resetColor}`);
});