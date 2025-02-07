import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT, // Especifica que estás usando PostgreSQL u otra base de datos
    logging: true, // Desactiva el registro de SQL en la consola
  }
);

export default sequelize;
