// config.js
require('dotenv').config(); // Cargar variables de entorno

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'tu_contraseña_local',
    database: process.env.DB_NAME || 'nombre_bd_local',
    host: process.env.HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false // SSL desactivado en desarrollo
    },
    logging: console.log // Muestra queries SQL en consola
  },
  test: {
    username: 'postgres',
    password: 'contraseña_test',
    database: 'bd_test',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DB_USER, // Debe coincidir con tu usuario de Supabase
    password: process.env.DB_PASSWORD, // Contraseña de Supabase
    database: process.env.DB_NAME || 'postgres', // postgres por defecto en Supabase
    host: process.env.HOST, // Formato: db.[id-proyecto].supabase.co
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: { // Obligatorio para Supabase
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
};