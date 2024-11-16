import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Pruebas de tests', 'postgres', ' ', {
  host: 'localhost', 
  dialect: 'postgres', // Especifica que estás usando PostgreSQL u otra base de datos
  logging: false, // Desactiva el registro de SQL en la consola
});

export default sequelize;