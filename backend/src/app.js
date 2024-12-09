import sequelize from "./config/database.js";
import Usuario from "./models/usuario_model.js";
import Test from "./models/test_model.js";
import Pregunta from "./models/pregunta_model.js";
import Respuesta from "./models/respuesta_model.js";
import Resultado from "./models/resultado_model.js";
import Rutina from "./models/rutina_model.js";
import express from 'express';
import swaggerSetup from './config/swagger.js'; // Asegúrate de que la ruta sea correcta
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes.js';
import preguntaRoutes from './routes/preguntaRoutes.js';
import testRoutes from './routes/testRoutes.js';
import rutinaRoutes from './routes/rutinaRoutes.js';
import resultadoRoutes from './routes/resultadoRoutes.js';
import respuestaRoutes from './routes/respuestaRoutes.js';
import { middleware } from "./middleware/middleware.js";
import logger from "./loggers/logger.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import morgan from 'morgan';
import cors from 'cors';


dotenv.config();

//Relaciones
Test.hasMany(Pregunta, { foreignKey: "testId" });
Pregunta.belongsTo(Test, { foreignKey: "testId" });

Pregunta.hasMany(Respuesta, { foreignKey: "preguntaId" });
Respuesta.belongsTo(Pregunta, { foreignKey: "preguntaId" });

Usuario.hasMany(Resultado, { foreignKey: "usuarioId" });
Resultado.belongsTo(Usuario, { foreignKey: "usuarioId" });

Resultado.hasOne(Rutina, { foreignKey: "resultadoId" });
Rutina.belongsTo(Resultado, { foreignKey: "resultadoId" });

Usuario.hasOne(Rutina, { foreignKey: "usuarioId" });
Rutina.belongsTo(Usuario, { foreignKey: "usuarioId" });

const app = express();

// Usa Morgan con el stream de Winston
app.use(morgan('informacion_combinada', { stream: logger.stream }));

app.use(express.json()) //Para usar JSON

// Configurar Swagger
swaggerSetup(app);

// Usa el middleware
app.use(middleware);

// logger
/* logger.info('Información de inicio'); */
/* logger.error('Error detectado'); */ //Para probar el funcionamiento de deteccion de errores
//Morgan
app.use(morgan('combined', { stream: logger.stream }));

// CORS
app.use(cors());

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', preguntaRoutes);
app.use('/api', testRoutes);
app.use('/api', resultadoRoutes);
app.use('/api', rutinaRoutes);
app.use('/api', respuestaRoutes);

// Usa el middleware de manejo de errores
app.use(errorMiddleware);

//Sincronizacion Base de Datos
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

  app.listen(process.env.PORT, () => {
    // Cambiar el color del texto a azul
    const blueColor = '\x1b[34m';
    const resetColor = '\x1b[0m';
    console.log(`${blueColor}Servidor corriendo en http://localhost:${process.env.PORT}${resetColor}`);
  });