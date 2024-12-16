'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar todos los registros existentes
    await queryInterface.bulkDelete("Usuario", null, {});
    await queryInterface.bulkDelete("Resultado", null, {});
    await queryInterface.bulkDelete("Rutina", null, {});
    await queryInterface.bulkDelete("Test", null, {});

    // Insertar datos en la tabla Usuario
    const usuarios = await queryInterface.bulkInsert("Usuario", [
      {
        nombre: "Juan",
        apellidos: "Pérez García",
        segundoNombre: "Antonio",
        nombreUsuario: "juanperez123",
        email: "juan@example.com",
        peso: 75.5,
        altura: 175.5,
        enfermedadCronica: "Ninguna",
        estadoFisicoActual: "Activo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Más usuarios...
    ], { returning: true });

    if (!usuarios || usuarios.length === 0) {
      throw new Error("No se pudieron insertar usuarios.");
    }

    // Insertar datos en la tabla Test
    const tests = await queryInterface.bulkInsert("Test", [
      {
        titulo: "Test de Matemáticas",
        descripcion: "Un test básico de matemáticas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Test de Historia",
        descripcion: "Un test sobre historia mundial",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });

    if (!tests || tests.length === 0) {
      throw new Error("No se pudieron insertar tests.");
    }

    // Insertar resultados
    const resultados = await queryInterface.bulkInsert("Resultado", [
      {
        usuarioId: usuarios[0]?.id, // Usa el ID del primer usuario
        testId: tests[0]?.id, // Usa el ID del primer test
        planchas: 10,
        abdominales: 20,
        flexibilidad: 15.5,
        velocidad: 7.2,
        resistenccia: 8.5,
        estado: "Bueno",
        tiempo_descanso: 6.5,
        deficiencias: "planchas, velocidad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        usuarioId: usuarios[0]?.id, // Usa el ID del primer usuario
        testId: tests[1]?.id, // Usa el ID del segundo test
        planchas: 5,
        abdominales: 10,
        flexibilidad: 12.0,
        velocidad: 6.0,
        resistenccia: 7.0,
        estado: "Regular",
        tiempo_descanso: 7.0,
        deficiencias: "abdominales, flexibilidad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });

    if (!resultados || resultados.length === 0) {
      throw new Error("No se pudieron insertar resultados.");
    }

    // Insertar rutina
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
        descripcion: "5 abdominales por día, Ejercicios de estiramiento diarios",
        resultadoId: resultados[1]?.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Insertar datos en la tabla Pregunta
    const preguntas = await queryInterface.bulkInsert("Pregunta", [
      {
        texto: "¿Cuánto es 2 + 2?",
        testId: tests[0]?.id, // Asociado al primer test
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        texto: "¿Quién descubrió América?",
        testId: tests[1]?.id, // Asociado al segundo test
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
        respuesta_boolean: true,
        respuesta_textual: "4",
        preguntaId: preguntas[0]?.id, // Asociado a la primera pregunta
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        respuesta_boolean: true,
        respuesta_textual: "Cristóbal Colón",
        preguntaId: preguntas[1]?.id, // Asociado a la segunda pregunta
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