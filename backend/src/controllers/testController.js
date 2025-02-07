import Test from '../models/test_model.js';
import Pregunta from '../models/pregunta_model.js';
import Resultado from '../models/resultado_model.js';

// Obtener todos los tests
// Obtener todos los tests
export const getTests = async () => {
  return await Test.findAll({
    include: [{
      model: Pregunta,
      as: 'Preguntas', 
    }],
  });
};

// Obtener un test por ID
export const getTestById = async (id) => {
  return await Test.findByPk(id, {
    include: [{
      model: Pregunta,
      as: 'Preguntas',
    }]
  });
};

// Crear un nuevo test
export const createTest = async (testData) => {
  return await Test.create(testData);
};

// Obtener el número de preguntas de un test por ID
export const getNumeroPreguntasByTestId = async (testId) => {
  console.log(`Buscando test con ID: ${testId}`);
  const test = await Test.findByPk(testId, {
    include: [{
      model: Pregunta,
      as: 'Preguntas',
    }],
  });

  if (!test) {
    console.log('Test no encontrado');
    throw new Error('Test no encontrado');
  }

  console.log('Test encontrado:', test);
  console.log('Preguntas asociadas:', test.Preguntas);

  if (!test.Preguntas || !Array.isArray(test.Preguntas)) {
    console.log('No se encontraron preguntas para este test');
    throw new Error('No se encontraron preguntas para este test');
  }

  return test.Preguntas.length;
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
  try {
    // Verificar si el test existe
    const test = await Test.findByPk(id);
    if (!test) {
      throw new Error('Test no encontrado');
    }

    // Eliminar los resultados asociados al test
    await Resultado.destroy({
      where: { testId: id }
    });

    // Eliminar el test
    await test.destroy();

    console.log(`Test con ID: ${id} eliminado correctamente`);
  } catch (error) {
    console.error("Error al eliminar el test:", error);
    throw new Error("No se pudo eliminar el test debido a un error interno.");
  }
};