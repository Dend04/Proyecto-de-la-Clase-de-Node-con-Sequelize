import sequelize from './config/database.js';
import Usuario from './models/usuario_model.js';
import Test from './models/test_model.js';

sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});