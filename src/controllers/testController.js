import Test from '../models/test_model.js';
import Pregunta from '../models/pregunta_model.js';

// Obtener todos los tests
export const getTests = async () => {
  return await Test.findAll({
    include: [{
      model: Pregunta
    }]
  });
};

// Obtener un test por ID
export const getTestById = async (id) => {
  return await Test.findByPk(id, {
    include: [{
      model: Pregunta
    }]
  });
};

// Crear un nuevo test
export const createTest = async (testData) => {
  return await Test.create(testData);
};

// Actualizar un test existente
export const updateTest = async (id, testData) => {
  const [updated] = await Test.update(testData, {
    where: { id }
  });
  
  if (!updated) throw new Error('Test no encontrado');
  
  return await Test.findByPk(id);
};

// Eliminar un test
export const deleteTest = async (id) => {
  const deleted = await Test.destroy({
    where: { id }
  });
  
  if (!deleted) throw new Error('Test no encontrado');
};