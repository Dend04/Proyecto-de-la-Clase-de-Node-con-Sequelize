import Pregunta from '../models/pregunta_model.js';
import Respuesta from '../models/respuesta_model.js';

// Obtener todas las respuestas
export const getRespuestas = async () => {
  return await Respuesta.findAll({
    include: [{
      model: Pregunta,
      attributes: ['texto', 'tipo'], // Incluye el texto y el tipo de la pregunta relacionada
    }],
  });
};

// Obtener una respuesta por ID
export const getRespuestaById = async (id) => {
  return await Respuesta.findByPk(id, {
    include: [{
      model: Pregunta,
      attributes: ['texto', 'tipo'],
    }],
  });
};

// Crear una nueva respuesta vinculada a una pregunta por su ID
export const createRespuesta = async (data) => {
  try {
    const pregunta = await Pregunta.findByPk(data.preguntaId);
    if (!pregunta) throw new Error('Pregunta no encontrada');

    // Validar que el campo "respuesta" tenga un valor
    if (!data.respuesta) {
      throw new Error('La respuesta debe tener un valor');
    }

    // Validar el tipo de la respuesta
    if (data.tipo === 'numero' && typeof data.respuesta !== 'number') {
      throw new Error('El valor de la respuesta debe ser un número');
    }

    if ((data.tipo === 'texto' || data.tipo === 'multiple' || data.tipo === 'unica') && typeof data.respuesta !== 'string') {
      throw new Error('El valor de la respuesta debe ser un texto');
    }

    // Crear la respuesta
    return await Respuesta.create({
      tipo: data.tipo,
      respuesta: data.respuesta,
      correcta: data.correcta, // Asegúrate de que este campo esté presente
      preguntaId: data.preguntaId,
    });
  } catch (error) {
    console.error('Error en createRespuesta:', error);
    throw new Error('Error al crear la respuesta: ' + error.message);
  }
};

// Actualizar una respuesta existente
export const updateRespuesta = async (id, respuestaData) => {
  const respuesta = await Respuesta.findByPk(id, {
    include: [{
      model: Pregunta,
      attributes: ['tipo'],
    }],
  });

  if (!respuesta) throw new Error('Respuesta no encontrada');

  // Validar la respuesta según el tipo de pregunta
  switch (respuesta.Pregunta.tipo) {
    case 'texto':
      if (typeof respuestaData.respuesta !== 'string') {
        throw new Error('La respuesta debe ser un texto');
      }
      break;
    case 'seleccion_unica':
      if (!Array.isArray(respuestaData.respuesta) || respuestaData.respuesta.length !== 1) {
        throw new Error('La respuesta debe ser una selección única');
      }
      break;
    case 'seleccion_multiple':
      if (!Array.isArray(respuestaData.respuesta) || respuestaData.respuesta.length < 1) {
        throw new Error('La respuesta debe ser una selección múltiple');
      }
      break;
    case 'numero':
      if (typeof respuestaData.respuesta !== 'number') {
        throw new Error('La respuesta debe ser un número');
      }
      break;
    default:
      throw new Error('Tipo de pregunta no válido');
  }

  const [updated] = await Respuesta.update(respuestaData, { where: { id } });
  if (!updated) throw new Error('Respuesta no encontrada');
  return await Respuesta.findByPk(id);
};

// Eliminar una respuesta
export const deleteRespuesta = async (id) => {
  const deleted = await Respuesta.destroy({ where: { id } });
  if (!deleted) throw new Error('Respuesta no encontrada');
};

// Obtener todas las respuestas de una pregunta por ID de pregunta
export const getRespuestasByPreguntaId = async (preguntaId) => {
  try {
    const respuestas = await Respuesta.findAll({ where: { preguntaId } });
    return respuestas;
  } catch (error) {
    console.error('Error al obtener las respuestas por pregunta:', error);
    throw new Error('Error al obtener las respuestas por pregunta');
  }
};