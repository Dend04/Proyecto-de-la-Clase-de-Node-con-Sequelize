import sequelize from "./config/database.js";
import Usuario from "./models/usuario_model.js";
import Test from "./models/test_model.js";
import Pregunta from "./models/pregunta_model.js";
import Respuesta from "./models/respuesta_model.js";
import Resultado from "./models/resultado_model.js";
import Rutina from "./models/rutina_model.js";

//Relaciones
Test.hasMany(Pregunta, { foreignKey: "testId" });
Pregunta.belongsTo(Test, { foreignKey: "testId" });

Pregunta.hasMany(Respuesta, { foreignKey: "preguntaId" });
Respuesta.belongsTo(Pregunta, { foreignKey: "preguntaId" });

Usuario.hasMany(Resultado, { foreignKey: "usuarioId" });
Resultado.belongsTo(Usuario, { foreignKey: "usuarioId" });

Test.hasMany(Resultado, { foreignKey: "testId" });
Resultado.belongsTo(Test, { foreignKey: "testId" });

Resultado.hasOne(Rutina, { foreignKey: "resultadoId" });
Rutina.belongsTo(Resultado, { foreignKey: "resultadoId" });

//Sincronizacion Base de Datos
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
