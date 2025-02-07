import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargar las variables de entorno según el entorno
const env = process.env.NODE_ENV || "development"; // Usar 'development' por defecto
const envFile = `.env.${env}`; // Cargar el archivo .env correspondiente
dotenv.config({ path: envFile });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DB_PORT || 5432, // Puerto por defecto para PostgreSQL
    dialect: process.env.DB_DIALECT,
    logging: false, // Desactiva el registro de SQL en la consola
    dialectOptions:{
      ssl: {
        require: true, // Requerido para Supabase
        rejectUnauthorized: false, // Necesario para Supabase
      },
    }
  }
);

export default sequelize;