import Pregunta from '../models/pregunta_model.js';
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
export const createPregunta = async (preguntaData) => {
  const { testId, ...data } = preguntaData;
  const test = await Test.findByPk(testId);
  if (!test) throw new Error('Test no encontrado');
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