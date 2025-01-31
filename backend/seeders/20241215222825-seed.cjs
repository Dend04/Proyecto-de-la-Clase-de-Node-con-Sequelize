'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar todos los registros existentes
    await queryInterface.bulkDelete("Usuario", null, {});
    await queryInterface.bulkDelete("Resultado", null, {});
    await queryInterface.bulkDelete("Rutina", null, {});
    await queryInterface.bulkDelete("Test", null, {});
    await queryInterface.bulkDelete("Pregunta", null, {});
    await queryInterface.bulkDelete("Respuesta", null, {});

    // Insertar datos en la tabla Usuario
    const usuarios = await queryInterface.bulkInsert("Usuario", [
      {
        nombre: "Juan",
        apellidos: "Pérez García",
        segundoNombre: "Antonio",
        nombreUsuario: "juanperez123",
        email: "juan@example.com",
        password: bcrypt.hashSync("password123", 10), // Hashear la contraseña
        peso: 75.5,
        altura: 175.5,
        enfermedadCronica: "Ninguna",
        estadoFisicoActual: "Activo",
        rol: "usuario",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "María",
        apellidos: "Gómez López",
        segundoNombre: "Isabel",
        nombreUsuario: "mariagomez456",
        email: "maria@example.com",
        password: bcrypt.hashSync("password123", 10), // Hashear la contraseña
        peso: 60.0,
        altura: 160.0,
        enfermedadCronica: "Ninguna",
        estadoFisicoActual: "Activo",
        rol: "usuario",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });

    if (!usuarios || usuarios.length === 0) {
      throw new Error("No se pudieron insertar usuarios.");
    }

    // Insertar datos en la tabla Test
    const tests = await queryInterface.bulkInsert("Test", [
      {
        titulo: "Test de Salud Física",
        descripcion: "Un test para evaluar el estado físico",
        tipo: "salud", // Nuevo campo
        etiqueta: "fitness", // Nuevo campo
        duracion: 30,
        dificultad: "medio",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Test de Conocimiento General",
        descripcion: "Un test sobre conocimientos básicos",
        tipo: "conocimiento", // Nuevo campo
        etiqueta: "educación", // Nuevo campo
        duracion: 20,
        dificultad: "facil",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });

    if (!tests || tests.length === 0) {
      throw new Error("No se pudieron insertar tests.");
    }

    // Insertar datos en la tabla Pregunta
    const preguntas = await queryInterface.bulkInsert("Pregunta", [
      {
        texto: "¿Cuántas planchas puedes hacer en un minuto?",
        testId: tests[0]?.id, // Asociado al primer test (salud)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        texto: "¿Cuántos abdominales puedes hacer en un minuto?",
        testId: tests[0]?.id, // Asociado al primer test (salud)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        texto: "¿Cuál es la capital de Francia?",
        testId: tests[1]?.id, // Asociado al segundo test (conocimiento)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        texto: "¿Quién escribió 'Cien años de soledad'?",
        testId: tests[1]?.id, // Asociado al segundo test (conocimiento)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });

    if (!preguntas || preguntas.length === 0) {
      throw new Error("No se pudieron insertar preguntas.");
    }

    // Insertar datos en la tabla Respuesta
    await queryInterface.bulkInsert("Respuesta", [
      {
        tipo: "numero", // Tipo de respuesta
        respuesta: { valor: 25 }, // Respuesta en formato JSON
        preguntaId: preguntas[0]?.id, // Asociado a la primera pregunta (planchas)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tipo: "numero", // Tipo de respuesta
        respuesta: { valor: 40 }, // Respuesta en formato JSON
        preguntaId: preguntas[1]?.id, // Asociado a la segunda pregunta (abdominales)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tipo: "texto", // Tipo de respuesta
        respuesta: { valor: "París" }, // Respuesta en formato JSON
        preguntaId: preguntas[2]?.id, // Asociado a la tercera pregunta (conocimiento)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tipo: "texto", // Tipo de respuesta
        respuesta: { valor: "Gabriel García Márquez" }, // Respuesta en formato JSON
        preguntaId: preguntas[3]?.id, // Asociado a la cuarta pregunta (conocimiento)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Insertar resultados
    const resultados = await queryInterface.bulkInsert("Resultado", [
      {
        usuarioId: usuarios[0]?.id, // Usa el ID del primer usuario
        testId: tests[0]?.id, // Usa el ID del primer test (salud)
        resultado: JSON.stringify({
          planchas: 25,
          abdominales: 40,
          flexibilidad: 8.5,
          velocidad: 7.0,
          resistencia: 8.0,
          tiempoDescanso: 7.5,
        }),
        estado: "Buen estado físico", // Estado calculado
        deficiencias: "flexibilidad, velocidad", // Deficiencias calculadas
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        usuarioId: usuarios[1]?.id, // Usa el ID del segundo usuario
        testId: tests[1]?.id, // Usa el ID del segundo test (conocimiento)
        resultado: JSON.stringify({
          respuestasCorrectas: [
            { preguntaId: preguntas[2]?.id, respuesta: "París" },
            { preguntaId: preguntas[3]?.id, respuesta: "Gabriel García Márquez" },
          ],
          respuestasIncorrectas: [],
        }),
        estado: "Excelente conocimiento", // Estado calculado
        deficiencias: null, // Sin deficiencias
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });

    if (!resultados || resultados.length === 0) {
      throw new Error("No se pudieron insertar resultados.");
    }

    // Insertar rutinas
    await queryInterface.bulkInsert("Rutina", [
      {
        nombre: "Rutina de Juan",
        descripcion: "5 planchas por día, Sprints cortos 3 veces por semana",
        resultadoId: resultados[0]?.id, // Usa el ID del primer resultado
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Rutina de María",
        descripcion: "Leer un libro al mes, Estudiar historia",
        resultadoId: resultados[1]?.id, // Usa el ID del segundo resultado
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Rutina", null, {});
    await queryInterface.bulkDelete("Resultado", null, {});
    await queryInterface.bulkDelete("Usuario", null, {});
    await queryInterface.bulkDelete("Pregunta", null, {});
    await queryInterface.bulkDelete("Respuesta", null, {});
    await queryInterface.bulkDelete("Test", null, {});
  },
};