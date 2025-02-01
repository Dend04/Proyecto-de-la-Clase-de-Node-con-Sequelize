import Pregunta from '../models/pregunta_model.js';
import Respuesta from '../models/respuesta_model.js';
import Test from '../models/test_model.js';

// Obtener todas las preguntas
export const getPreguntas = async () => {
  return await Pregunta.findAll();
};

// Obtener una pregunta por ID
export const getPreguntaById = async (id) => {
  return await Pregunta.findByPk(id);
};

// Crear una nueva pregunta vinculada a un test por su ID
export const createPregunta = async (testId, data) => {
  const test = await Test.findByPk(testId);
  if (!test) throw new Error('Test no encontrado');
  if (!data.texto) throw new Error('El campo "texto" es obligatorio');
  return await Pregunta.create({ ...data, testId });
};

// Actualizar una pregunta existente
export const updatePregunta = async (id, preguntaData) => {
  const [updated] = await Pregunta.update(preguntaData, { where: { id } });
  if (!updated) throw new Error('Pregunta no encontrada');
  return await Pregunta.findByPk(id);
};


// Eliminar una pregunta
export const deletePregunta = async (id) => {
  const deleted = await Pregunta.destroy({ where: { id } });
  if (!deleted) throw new Error('Pregunta no encontrada');
};
// Obtener todas las preguntas de un test por ID de test
export const getPreguntasByTestId = async (testId) => {
  return await Pregunta.findAll({ where: { testId } });
};

  
  // Obtener todas las preguntas de un test por nombre de test
  export const getPreguntasByTestName = async (testName) => {
    const test = await Test.findOne({ where: { name: testName } });
    if (!test) throw new Error('Test no encontrado');
    return await Pregunta.findAll({ where: { testId: test.id } });
  };

  export const getPreguntasConRespuestasByTestId = async (testId) => {
    try {
      const preguntas = await Pregunta.findAll({
        where: { testId },
        include: [{ model: Respuesta }], // Incluir las respuestas relacionadas
      });
  
      const preguntasConEstado = preguntas.map((pregunta) => {
        const tieneRespuestas = pregunta.Respuesta && pregunta.Respuesta.length > 0; // Usar "Respuesta" en lugar de "Respuestas"
        return {
          ...pregunta.toJSON(), // Convertir a un objeto plano
          completa: tieneRespuestas, // Indicador de si la pregunta está completa
        };
      });
  
      return preguntasConEstado;
    } catch (error) {
      console.error("Error en getPreguntasConRespuestasByTestId:", error);
      throw new Error("Error al obtener las preguntas y respuestas del test");
    }
  };