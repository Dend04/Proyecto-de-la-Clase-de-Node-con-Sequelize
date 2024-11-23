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

app.use(express.json()) //Para usar JSON

// Configurar Swagger
swaggerSetup(app);

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', preguntaRoutes);
app.use('/api', testRoutes);

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
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
  });