import Pregunta from "../models/pregunta_model.js";
import Respuesta from "../models/respuesta_model.js";

// Mostrar todas las respuestas
export const getRespuestas = async (req, res) => {
    try {
      const respuestas = await Respuesta.findAll({
        include: [{
          model: Pregunta,
          attributes: ['texto'], // Incluye el texto de la pregunta relacionada
        }],
      });
      res.status(200).json(respuestas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las respuestas' });
    }
  };
  
  // Agregar una nueva respuesta
  export const addRespuesta = async (req, res) => {
    const { respuesta_boolean, respuesta_textual, preguntaId } = req.body;
  
    // Verifica que al menos una de las respuestas esté presente
    if (respuesta_boolean === undefined && !respuesta_textual) {
      return res.status(400).json({ error: 'Debe proporcionar al menos una respuesta' });
    }
  
    try {
      const nuevaRespuesta = await Respuesta.create({
        respuesta_boolean: respuesta_boolean || false, // Valor por defecto si no se proporciona
        respuesta_textual: respuesta_textual || '', // Valor por defecto si no se proporciona
        preguntaId,
      });
      res.status(201).json(nuevaRespuesta);
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar la respuesta' });
    }
  };

  // Eliminar una respuesta
export const deleteRespuesta = async (req, res) => {
  const { id } = req.params;

  try {
    const respuesta = await Respuesta.findByPk(id);
    if (!respuesta) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }

    await respuesta.destroy();
    res.status(200).json({ message: 'Respuesta eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la respuesta' });
  }
};

// Editar una respuesta
export const updateRespuesta = async (req, res) => {
  const { id } = req.params;
  const { respuesta_boolean, respuesta_textual, preguntaId } = req.body;

  // Verifica que solo una de las respuestas esté presente
  if ((respuesta_boolean === undefined && !respuesta_textual) || 
      (respuesta_boolean !== undefined && respuesta_textual)) {
    return res.status(400).json({ error: 'Debe proporcionar solo una respuesta, ya sea booleana o textual' });
  }

  try {
    const respuesta = await Respuesta.findByPk(id);
    if (!respuesta) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }

    // Actualiza los campos de la respuesta
    respuesta.respuesta_boolean = respuesta_boolean !== undefined ? respuesta_boolean : null;
    respuesta.respuesta_textual = respuesta_textual || null;
    respuesta.preguntaId = preguntaId || respuesta.preguntaId;

    await respuesta.save();
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la respuesta' });
  }
};