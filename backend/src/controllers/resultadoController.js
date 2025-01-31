import Resultado from '../models/resultado_model.js';
import Test from '../models/test_model.js';
import Usuario from '../models/usuario_model.js';

// Obtener todos los resultados
export const getResultados = async () => {
  return await Resultado.findAll({
    include: [Test, Usuario]
  });
};

// Obtener un resultado por ID
export const getResultadoById = async (id) => {
  return await Resultado.findByPk(id, {
    include: [Test, Usuario]
  });
};

// Obtener resultados por usuario ID
export const getResultadosByUsuarioId = async (usuarioId) => {
  return await Resultado.findAll({
    where: { usuarioId },
    include: [Test]
  });
};

// Crear un nuevo resultado
export const createResultadoFromTest = async (resultadoData) => {
  try {
    const { usuarioId, testId, respuestas } = resultadoData;

    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) throw new Error('Usuario no encontrado');

    const test = await Test.findByPk(testId);
    if (!test) throw new Error('Test no encontrado');

    let estado, deficiencias;

    if (test.tipo === 'salud') {
      const resultadoSalud = determinarEstadoFisicoYDeficiencias(respuestas);
      estado = resultadoSalud.estado;
      deficiencias = resultadoSalud.deficiencias;
    } else if (test.tipo === 'conocimiento') {
      const resultadoConocimiento = determinarResultadoConocimiento(respuestas);
      estado = resultadoConocimiento.estado;
      deficiencias = resultadoConocimiento.deficiencias;
    } else {
      estado = 'Resultado generado';
      deficiencias = null;
    }

    const resultado = await Resultado.create({
      usuarioId,
      testId,
      resultado: respuestas,
      estado,
      deficiencias: deficiencias ? deficiencias.join(', ') : null,
    });

    return resultado;
  } catch (error) {
    console.error('Error al crear resultado:', error);
    throw new Error('Error al crear resultado');
  }
};

// Función auxiliar para determinar estado físico
const determinarEstadoFisicoYDeficiencias = (respuestas) => {
  let puntaje = 0;
  let deficiencias = [];
  const { planchas, abdominales, flexibilidad, velocidad, resistencia, tiempoDescanso } = respuestas;

  if (planchas >= 30) puntaje += 2;
  else if (planchas >= 20) puntaje += 1;
  else deficiencias.push('planchas');

  if (abdominales >= 50) puntaje += 2;
  else if (abdominales >= 30) puntaje += 1;
  else deficiencias.push('abdominales');

  if (flexibilidad >= 9) puntaje += 2;
  else if (flexibilidad >= 7) puntaje += 1;
  else deficiencias.push('flexibilidad');

  if (velocidad >= 9) puntaje += 2;
  else if (velocidad >= 7) puntaje += 1;
  else deficiencias.push('velocidad');

  if (resistencia >= 9) puntaje += 2;
  else if (resistencia >= 7) puntaje += 1;
  else deficiencias.push('resistencia');

  if (tiempoDescanso >= 9) puntaje += 2;
  else if (tiempoDescanso >= 8) puntaje += 1;
  else deficiencias.push('tiempo de descanso');

  let estado;
  if (puntaje >= 10) estado = 'Excelente estado físico';
  else if (puntaje >= 7) estado = 'Buen estado físico';
  else if (puntaje >= 4) estado = 'Saludable';
  else if (puntaje >= 2) estado = 'Estado normal';
  else estado = 'Poco saludable';

  return { estado, deficiencias };
};

// Función auxiliar para determinar resultado de conocimiento
const determinarResultadoConocimiento = (respuestas) => {
  let puntaje = 0;
  let deficiencias = [];
  const { respuestasCorrectas, respuestasIncorrectas } = respuestas;

  puntaje = respuestasCorrectas.length;
  deficiencias = respuestasIncorrectas.map(respuesta => `Pregunta ${respuesta.preguntaId}`);

  let estado;
  if (puntaje >= 90) estado = 'Excelente conocimiento';
  else if (puntaje >= 70) estado = 'Buen conocimiento';
  else if (puntaje >= 50) estado = 'Conocimiento regular';
  else if (puntaje >= 30) estado = 'Conocimiento básico';
  else estado = 'Conocimiento insuficiente';

  return { estado, deficiencias };
};