import Pregunta from '../models/pregunta_model.js';
import Respuesta from '../models/respuesta_model.js';

// Obtener todas las respuestas
export const getRespuestas = async () => {
  return await Respuesta.findAll({
    include: [{
      model: Pregunta,
      attributes: ['texto'], // Incluye el texto de la pregunta relacionada
    }],
  });
};

// Obtener una respuesta por ID
export const getRespuestaById = async (id) => {
  return await Respuesta.findByPk(id, {
    include: [{
      model: Pregunta,
      attributes: ['texto'],
    }],
  });
};

// Crear una nueva respuesta vinculada a una pregunta por su ID
export const createRespuesta = async (respuestaData) => {
  const { preguntaId, ...data } = respuestaData;
  const pregunta = await Pregunta.findByPk(preguntaId);
  if (!pregunta) throw new Error('Pregunta no encontrada');
  return await Respuesta.create({ ...data, preguntaId });
};

// Actualizar una respuesta existente
export const updateRespuesta = async (id, respuestaData) => {
  const [updated] = await Respuesta.update(respuestaData, { where: { id } });
  if (!updated) throw new Error('Respuesta no encontrada');
  return await Respuesta.findByPk(id);
};

// Eliminar una respuesta
export const deleteRespuesta = async (id) => {
  const deleted = await Respuesta.destroy({ where: { id } });
  if (!deleted) throw new Error('Respuesta no encontrada');
};