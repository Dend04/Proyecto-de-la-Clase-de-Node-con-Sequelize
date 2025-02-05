import Pregunta from "../models/pregunta_model.js";
import Respuesta from "../models/respuesta_model.js";
import Resultado from "../models/resultado_model.js";
import Test from "../models/test_model.js";
import Usuario from "../models/usuario_model.js";
import { getNumeroPreguntasByTestId } from "./testController.js";

// Obtener todos los resultados
export const getResultados = async () => {
  return await Resultado.findAll({
    include: [Test, Usuario],
  });
};

// Obtener un resultado por ID
export const getResultadoById = async (id) => {
  return await Resultado.findByPk(id, {
    include: [
      {
        model: Test,
        as: "Test",
        include: [
          {
            model: Pregunta,
            as: "Preguntas",
          },
        ],
      },
      Usuario,
    ],
  });
};

// Obtener resultados por usuario ID
export const getResultadosByUsuarioId = async (usuarioId) => {
  return await Resultado.findAll({
    where: { usuarioId },
    include: [Test],
  });
};

// Crear un nuevo resultado
export const createResultadoFromTest = async (resultadoData) => {
  try {
    const { usuarioId, testId, respuestas } = resultadoData;

    // Verificar que el usuario y el test existan
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) throw new Error("Usuario no encontrado");

    const test = await Test.findByPk(testId);
    if (!test) throw new Error("Test no encontrado");

    // Obtener el número total de preguntas del test
    const numeroTotalPreguntas = await getNumeroPreguntasByTestId(testId);

    // Obtener las respuestas correctas del test
    const respuestasCorrectasTest = await Respuesta.findAll({
      where: { correcta: true },
      include: [{ model: Pregunta, where: { testId } }],
    });

    // Calcular el número de respuestas correctas del usuario
    let respuestasCorrectas = 0;
    const respuestasIncorrectas = [];

    for (const respuesta of respuestas) {
      const esCorrecta = respuestasCorrectasTest.some(
        (r) =>
          r.preguntaId === respuesta.preguntaId &&
          r.id === respuesta.respuestaId
      );
      if (esCorrecta) {
        respuestasCorrectas++;
      } else {
        respuestasIncorrectas.push(`Pregunta ${respuesta.preguntaId}`);
      }
    }

    // Calcular el porcentaje de aciertos
    const porcentajeCorrectas =
      (respuestasCorrectas / numeroTotalPreguntas) * 100;

    // Determinar el estado basado en el porcentaje
    let estado;
    if (porcentajeCorrectas >= 90) estado = "Excelente conocimiento";
    else if (porcentajeCorrectas >= 70) estado = "Buen conocimiento";
    else if (porcentajeCorrectas >= 50) estado = "Conocimiento regular";
    else if (porcentajeCorrectas >= 30) estado = "Conocimiento básico";
    else estado = "Conocimiento insuficiente";

    // Guardar el resultado en la base de datos
    const resultado = await Resultado.create({
      usuarioId,
      testId,
      resultado: {
        respuestasCorrectas,
        respuestasIncorrectas: respuestasIncorrectas.join(", "),
        porcentajeCorrectas,
      },
      estado,
      deficiencias: respuestasIncorrectas.join(", "),
    });

    return resultado;
  } catch (error) {
    console.error("Error al crear resultado:", error);
    throw new Error("Error al crear resultado");
  }
};

// Guardar resultados de un test
export const saveTestResults = async (testId, respuestas) => {
  try {
    console.log('Recibiendo respuestas:', respuestas); // Verificar las respuestas recibidas

    // Verificar si el test existe
    const test = await Test.findByPk(testId);
    if (!test) {
      throw new Error('Test no encontrado');
    }

    // Verificar la etiqueta del test
    if (test.etiqueta === 'Salud') {
      // Para tests de salud, usar la lógica específica
      const resultado = await Resultado.create({
        usuarioId: respuestas.usuarioId, // Asegúrate de que el usuarioId esté presente en las respuestas
        testId,
        resultado: {
          valores: respuestas, // Aquí se guardan las respuestas numéricas
          estado: respuestas.estado, // Asegúrate de que el estado esté presente en las respuestas
          deficiencias: respuestas.deficiencias // Asegúrate de que las deficiencias estén presentes en las respuestas
        },
        estado: respuestas.estado,
        deficiencias: respuestas.deficiencias
      });
      
      return resultado;
    }

    // Obtener el número total de preguntas del test
    const numeroTotalPreguntas = await getNumeroPreguntasByTestId(testId);
    console.log('Número total de preguntas:', numeroTotalPreguntas); // Verificar el número de preguntas

    // Obtener las respuestas correctas del test
    const respuestasCorrectasTest = await Respuesta.findAll({
      where: { correcta: true },
      include: [{ model: Pregunta, where: { testId } }],
    });
    console.log('Respuestas correctas del test:', respuestasCorrectasTest); // Verificar las respuestas correctas

    // Obtener todas las preguntas del test
    const preguntas = await Pregunta.findAll({
      where: { testId },
    });

    // Calcular el número de respuestas correctas del usuario
    let respuestasCorrectas = 0;
    const respuestasIncorrectas = [];

    for (const respuesta of respuestas) {
      const esCorrecta = respuestasCorrectasTest.some(
        (r) => r.preguntaId === respuesta.preguntaId && r.id === respuesta.respuestaId
      );
      if (esCorrecta) {
        respuestasCorrectas++;
      } else {
        // Obtener el texto de la pregunta incorrecta
        const preguntaIncorrecta = preguntas.find(p => p.id === respuesta.preguntaId);
        if (preguntaIncorrecta) {
          respuestasIncorrectas.push(preguntaIncorrecta.texto); // Usar el texto de la pregunta
        }
      }
    }

    console.log('Respuestas correctas del usuario:', respuestasCorrectas); // Verificar las respuestas correctas del usuario
    console.log('Respuestas incorrectas del usuario:', respuestasIncorrectas); // Verificar las respuestas incorrectas del usuario

    // Calcular el porcentaje de aciertos
    const porcentajeCorrectas = (respuestasCorrectas / numeroTotalPreguntas) * 100;
    console.log('Porcentaje de aciertos:', porcentajeCorrectas); // Verificar el porcentaje de aciertos

    // Determinar el estado basado en el porcentaje
    let estado;
    if (porcentajeCorrectas >= 90) estado = 'Excelente conocimiento';
    else if (porcentajeCorrectas >= 70) estado = 'Buen conocimiento';
    else if (porcentajeCorrectas >= 50) estado = 'Conocimiento regular';
    else if (porcentajeCorrectas >= 30) estado = 'Conocimiento básico';
    else estado = 'Conocimiento insuficiente';

    console.log('Estado del resultado:', estado); // Verificar el estado del resultado

    // Guardar el resultado en la base de datos
    const resultado = await Resultado.create({
      testId,
      resultado: {
        respuestasCorrectas,
        respuestasIncorrectas: respuestasIncorrectas.join(', '), // Unir los textos de las preguntas incorrectas
        porcentajeCorrectas,
      },
      estado,
      deficiencias: respuestasIncorrectas.join(', '), // Unir los textos de las preguntas incorrectas
    });

    console.log('Resultado guardado:', resultado); // Verificar el resultado guardado

    return resultado;
  } catch (error) {
    console.error('Error al guardar resultados:', error);
    throw new Error('Error interno del servidor');
  }
};

// Función auxiliar para determinar estado físico
const determinarEstadoFisicoYDeficiencias = (respuestas) => {
  let puntaje = 0;
  let deficiencias = [];
  const {
    planchas,
    abdominales,
    flexibilidad,
    velocidad,
    resistencia,
    tiempoDescanso,
  } = respuestas;

  if (planchas >= 30) puntaje += 2;
  else if (planchas >= 20) puntaje += 1;
  else deficiencias.push("planchas");

  if (abdominales >= 50) puntaje += 2;
  else if (abdominales >= 30) puntaje += 1;
  else deficiencias.push("abdominales");

  if (flexibilidad >= 9) puntaje += 2;
  else if (flexibilidad >= 7) puntaje += 1;
  else deficiencias.push("flexibilidad");

  if (velocidad >= 9) puntaje += 2;
  else if (velocidad >= 7) puntaje += 1;
  else deficiencias.push("velocidad");

  if (resistencia >= 9) puntaje += 2;
  else if (resistencia >= 7) puntaje += 1;
  else deficiencias.push("resistencia");

  if (tiempoDescanso >= 9) puntaje += 2;
  else if (tiempoDescanso >= 8) puntaje += 1;
  else deficiencias.push("tiempo de descanso");

  let estado;
  if (puntaje >= 10) estado = "Excelente estado físico";
  else if (puntaje >= 7) estado = "Buen estado físico";
  else if (puntaje >= 4) estado = "Saludable";
  else if (puntaje >= 2) estado = "Estado normal";
  else estado = "Poco saludable";

  return { estado, deficiencias };
};

// Función auxiliar para determinar resultado de conocimiento
const determinarResultadoConocimiento = (respuestas) => {
  let puntaje = 0;
  let deficiencias = [];
  const { respuestasCorrectas, respuestasIncorrectas } = respuestas;

  puntaje = respuestasCorrectas.length;
  deficiencias = respuestasIncorrectas.map(
    (respuesta) => `Pregunta ${respuesta.preguntaId}`
  );

  let estado;
  if (puntaje >= 90) estado = "Excelente conocimiento";
  else if (puntaje >= 70) estado = "Buen conocimiento";
  else if (puntaje >= 50) estado = "Conocimiento regular";
  else if (puntaje >= 30) estado = "Conocimiento básico";
  else estado = "Conocimiento insuficiente";

  return { estado, deficiencias };
};
