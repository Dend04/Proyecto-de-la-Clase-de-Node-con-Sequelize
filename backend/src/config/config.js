module.exports = {
  development: {
    username: "postgres",
    password: " ", // Asegúrate de que la contraseña sea correcta
    database: "Pruebas de tests",
    host: "127.0.0.1",
    dialect: "postgres", // Asegúrate de que esto sea una cadena de texto
  },
  test: {
    username: "postgres",
    password: " ",
    database: "Pruebas de tests",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: " ",
    database: "Pruebas de tests",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};